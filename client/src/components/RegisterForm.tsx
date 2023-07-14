import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading } from "react-icons/ai";

const RegisterForm = () => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };
    
    const [inputValues, setInputValues] = useState<{ [x: string]: string }>()
    const [errorMessage, setErrorMessage] = useState<any>()
    const [usernameIcon, setUsernameIcon] = useState<JSX.Element>()
    const [passwordIcon, setPasswordIcon] = useState<JSX.Element>()
    const [emailIcon, setEmailIcon] = useState<JSX.Element>()
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState<JSX.Element>()

    // Validates form input values, password must be at least 8 characters long, only letters and numbers
    // Username must be at least 4 characters long and contain only letters and numbers
    // Email must be a valid email address
    // Confirm password must match password and also fit the password constraints
    const validateForm = (inputName?: string, inputValue?: string) => {
        if (inputValue === '' || inputValue === undefined) return false
        if (inputName === 'username') {
            if (inputValue?.length >= 4 && /^[a-zA-Z0-9]+$/.test(inputValue)) {
                return true
            } else {
                return false
            }
        } else if (inputName === 'password') {
            if (inputValue?.length >= 8 && /^[a-zA-Z0-9]+$/.test(inputValue)) {
                return true
            } else {
                return false
            }
        }
        else if (inputName === 'email') {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inputValue)) {
                return true
            } else {
                return false
            }
        }
        else if (inputName === 'confirm_password') {
            if (inputValue === inputValues?.password && /^[a-zA-Z0-9]+$/.test(inputValue) && inputValue?.length >= 8) {
                return true
            } else {
                return false
            }
        }
    }

    // Function to set an icon for each input field, check for valid input, x for invalid input
    const setIcon = (inputName: string, inputValue: string) => {
        if (inputName === 'username') {
            if (validateForm(inputName, inputValue)) {
                setUsernameIcon(<AiOutlineCheckCircle className="text-green-500" />)
            } else {
                setUsernameIcon(<AiOutlineCloseCircle className="text-red-500" />)
            }
        } else if (inputName === 'password') {
            if (validateForm(inputName, inputValue)) {
                setPasswordIcon(<AiOutlineCheckCircle className="text-green-500" />)
            } else {
                setPasswordIcon(<AiOutlineCloseCircle className="text-red-500" />)
                setConfirmPasswordIcon(<AiOutlineCloseCircle className="text-red-500" />)
            }
        } else if (inputName === 'email') {
            if (validateForm(inputName, inputValue)) {
                setEmailIcon(<AiOutlineCheckCircle className="text-green-500" />)
            } else {
                setEmailIcon(<AiOutlineCloseCircle className="text-red-500" />)
            }
        }
        else if (inputName === 'confirm_password') {
            if (validateForm(inputName, inputValue)) {
                setConfirmPasswordIcon(<AiOutlineCheckCircle className="text-green-500" />)
            } else {
                setConfirmPasswordIcon(<AiOutlineCloseCircle className="text-red-500" />)
            }
        }
    }
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setInputValues(prevState => ({ ...prevState, [name]: value }))
        setIcon(name, value)
    }

    // Sends a register request to the server if all inputs are valid
    const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        setErrorMessage(<AiOutlineLoading className="animate-spin text-3xl" />)

        // Checks if any of the inputs have invalid values
        if (validateForm('name', inputValues?.username) === false) {
            setTimeout(() => { setErrorMessage(<h1 className="text-red-500">Invalid username</h1>) }, 1500)
            return
        } else if (validateForm('password', inputValues?.password) === false) {
            setTimeout(() => { setErrorMessage(<h1 className="text-red-500">Invalid password</h1>) }, 1500)
            return
        } else if (validateForm('email', inputValues?.email) === false) {
            setTimeout(() => { setErrorMessage(<h1 className="text-red-500">Invalid email</h1>) }, 1500)
            return
        } else if (validateForm('confirm_password', inputValues?.confirm_password) === false) {
            setTimeout(() => { setErrorMessage(<h1 className="text-red-500">Passwords do not match</h1>) }, 1500)
            return
        }

        e.preventDefault()
        const data = {
        username: inputValues?.username,
        email: inputValues?.email,
        password: inputValues?.password,
        confirm_password: inputValues?.confirm_password
        }

        // sends a request to the localhost:3000 server to fetch the response from the register api call for the user
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        }).then(res => res.json())
        .then(data => {
            return data
        })

        if (response.status === 'success') {
            setTimeout(() => { setErrorMessage(<h1 className="text-green-500">{response.message}</h1>) }, 1700)
            setTimeout(() => { window.location.replace("http://localhost:5173/login") }, 4000)
        } else {
            setTimeout(() => { setErrorMessage(<h1 className="text-red-500">{response.message}</h1>) }, 1500)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <div className="py-7 px-10 drop-shadow-lg flex rounded-lg flex-col bg-[#e6e8e8] lg:w-[40vw] gap-6">
                    <h1 className="text-2xl font-semibold">Create an account with us!</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <label className="text-left">Username (4-24 characters, no symbols)</label>
                                {usernameIcon}
                            </div>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="username" value={inputValues?.username || ''} type="text" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <label className="text-left">Email</label>
                                {emailIcon}
                            </div>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="email" value={inputValues?.email || ''} type="email" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <label className="text-left">Password (8-24 characters, no symbols)</label>
                                {passwordIcon}
                            </div>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="password" value={inputValues?.password || ''} type="password" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <label className="text-left">Confirm Password</label>
                                {confirmPasswordIcon}
                            </div>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="confirm_password" value={inputValues?.confirm_password || ''} type="password" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col self-center items-center pt-[13px] gap-5">
                            <Link to="/login" className="text-md flex gap-[5px]">
                                <h1 className="cursor-default">Already have an account?</h1>
                                <h1 className="text-neutral font-bold" onClick={() => openInNewTab("http://localhost:5173/")}>Click here</h1>
                            </Link>
                            <h1 className="shadow-lg btn-md btn btn-neutral w-[400px]" onClick={handleFormSubmit}>Register</h1>
                            {errorMessage}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm