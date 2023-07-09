import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterForm = () => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };
    
    const [inputValues, setInputValues] = useState<{ [x: string]: string }>()

    const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const data = {
        name: inputValues?.name,
        email: inputValues?.email,
        password: inputValues?.password,
        confirm_password: inputValues?.confirm_password
        }
        console.log(data)
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setInputValues(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <div className="py-7 px-10 drop-shadow-lg flex rounded-lg flex-col bg-[#e6e8e8] lg:w-[40vw] gap-6">
                    <h1 className="text-2xl font-semibold">Create an account with us!</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Username</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="name" value={inputValues?.name || ''} type="text" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Email</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="email" value={inputValues?.email || ''} type="email" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Password</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="password" value={inputValues?.password || ''} type="password" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Confirm Password</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" name="confirm_password" value={inputValues?.confirm_password || ''} type="password" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col self-center items-center pt-[13px] gap-5">
                            <Link to="/login" className="text-md flex gap-[5px]">
                                <h1 className="cursor-default">Already have an account?</h1>
                                <h1 className="text-neutral font-bold" onClick={() => openInNewTab("http://localhost:5173/")}>Click here</h1>
                            </Link>
                            <h1 className="shadow-lg btn-md btn btn-neutral w-[400px]" onClick={handleFormSubmit}>Register</h1>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm