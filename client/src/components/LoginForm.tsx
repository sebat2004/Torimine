import { Link } from "react-router-dom"
import { useState } from "react"
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"

const LoginForm = () => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        }

    const [inputValues, setInputValues] = useState<{ [x: string]: string }>()

    // Validates form input values, password must be at least 8 characters long, only letters and numbers
    // Username must be at least 4 characters long and contain only letters and numbers
    const validateForm = (inputName?: string, inputValue?: string) => {
        if (inputValue === '' || inputValue === undefined) return ''
        if (inputName === 'name') {
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
    }

    // state to set icon type for username
    const [usernameIcon, setUserNameIcon] = useState<JSX.Element>()
    // state to set icon type for password
    const [passwordIcon, setPasswordIcon] = useState<JSX.Element>()
    
    // function to set icon type based on validateForm function
    const setIcon = (inputName: string, inputValue: string) => {
        if (inputName === 'name') {
            if (validateForm(inputName, inputValue)) {
                setUserNameIcon(<AiOutlineCheckCircle className="text-green-500" />)
            } else {
                setUserNameIcon(<AiOutlineCloseCircle className="text-red-500" />)
            }
        } else if (inputName === 'password') {
            if (validateForm(inputName, inputValue)) {
                setPasswordIcon(<AiOutlineCheckCircle className="text-green-500" />)
            } else {
                setPasswordIcon(<AiOutlineCloseCircle className="text-red-500" />)
            }
        }
    }

    const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const data = {
        name: inputValues?.name,
        password: inputValues?.password,
        }
        console.log(data)
        // sends a request to the localhost:3000 server to fetch the response from the login api call for the user
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                return data
            }
        )
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setInputValues(prevState => ({ ...prevState, [name]: value }))
        setIcon(name, value)
    }

  return (
    <>
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <div className="py-7 px-10 drop-shadow-lg flex rounded-lg bg-[#e6e8e8] flex-col lg:w-[40vw] gap-6">
                <h1 className="text-2xl font-semibold">Login</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <label className="text-left">Username (4-24 characters, no symbols)</label>
                            {usernameIcon}
                        </div>
                        <input className="input bg-[#e0e1e0] border-opacity-10" type="text" name="name" onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <label className="text-left">Password (8-24 characters, no symbols)</label>
                            {passwordIcon}
                        </div>
                        <input className="input bg-[#e0e1e0] border-opacity-10" type="password" name="password" onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col self-center items-center pt-[13px] gap-5">
                        <Link to="/login" className="text-md flex gap-[5px]">
                            <h1 className="cursor-normal">Forgot Password?</h1>
                            <h1 className="text-neutral font-bold" onClick={() => openInNewTab("http://localhost:5173/")}>Click here</h1>
                        </Link>
                        <h1 className="shadow-lg btn-md btn btn-neutral w-[400px]" onClick={handleFormSubmit}>Login</h1>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default LoginForm