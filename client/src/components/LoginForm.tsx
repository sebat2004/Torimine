import { Link } from "react-router-dom"
import { useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"

const LoginForm = () => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        }

    const [inputValues, setInputValues] = useState<{ [x: string]: string }>()
    const [errorMessage, setErrorMessage] = useState<any>()

    const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        setErrorMessage(<AiOutlineLoading className="animate-spin text-3xl" />)

        e.preventDefault()
        const data = {
        username: inputValues?.username,
        password: inputValues?.password,
        }
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
                return data
            });
        if (response.status === 'success') {
            setTimeout(() => { setErrorMessage(<h1 className="text-green-500">{response.message}</h1>) }, 1700)
            setTimeout(() => { window.location.replace("http://localhost:5173/workspace") }, 4000)
        } else {
                setTimeout(() => { setErrorMessage(<h1 className="text-red-500">{response.message}</h1>) }, 1500)
        }
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setInputValues(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <div className="py-7 px-10 drop-shadow-lg flex rounded-lg bg-[#e6e8e8] flex-col lg:w-[40vw] gap-6">
                    <h1 className="text-2xl font-semibold">Login</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Username</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" type="text" name="username" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Password</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" type="password" name="password" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col self-center items-center pt-[13px] gap-5">
                            <Link to="/login" className="text-md flex gap-[5px]">
                                <h1 className="cursor-normal">Forgot Password?</h1>
                                <h1 className="text-neutral font-bold" onClick={() => openInNewTab("http://localhost:5173/")}>Click here</h1>
                            </Link>
                            <h1 className="shadow-lg btn-md btn btn-neutral w-[400px]" onClick={handleFormSubmit}>Login</h1>
                            {errorMessage}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm