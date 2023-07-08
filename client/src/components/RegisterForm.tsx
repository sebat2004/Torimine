import { Link } from "react-router-dom"

const RegisterForm = () => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        }
        
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <div className="py-7 px-10 drop-shadow-lg flex rounded-lg flex-col bg-[#e6e8e8] lg:w-[40vw] gap-6">
                    <h1 className="text-2xl font-semibold">Create an account with us!</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Username</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" type="text" placeholder="Username" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Email</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" type="email" placeholder="name@company.com" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Password</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" type="password" placeholder="Password" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-left">Confirm Password</label>
                            <input className="input bg-[#e0e1e0] border-opacity-10" type="password" placeholder="Confirm Password" />
                        </div>
                        <div className="flex flex-col self-center items-center pt-[13px] gap-5">
                            <Link to="/login" className="text-md flex gap-[5px]">
                                <h1 className="cursor-default">Already have an account?</h1>
                                <h1 className="text-neutral font-bold" onClick={() => openInNewTab("http://localhost:5173/")}>Click here</h1>
                            </Link>
                            <Link to="/login" className="shadow-lg btn-md btn btn-neutral w-[400px]">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm