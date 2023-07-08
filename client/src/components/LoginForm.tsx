import { Link } from "react-router-dom"

const LoginForm = () => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        }

  return (
    <>
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <div className="py-7 px-10 drop-shadow-lg flex rounded-lg bg-[#e6e8e8] flex-col lg:w-[40vw] gap-6">
                <h1 className="text-2xl font-semibold">Login</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-left">Username/E-mail</label>
                        <input className="input bg-[#e0e1e0] border-opacity-10" type="text" placeholder="Username or e-mail" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-left">Password</label>
                        <input className="input bg-[#e0e1e0] border-opacity-10" type="password" placeholder="Password" />
                    </div>
                    <div className="flex flex-col self-center items-center pt-[13px] gap-5">
                        <Link to="/login" className="text-md flex gap-[5px]">
                            <h1 className="cursor-normal">Forgot Password?</h1>
                            <h1 className="text-neutral font-bold" onClick={() => openInNewTab("http://localhost:5173/")}>Click here</h1>
                        </Link>
                        <Link to="/workspace" className="shadow-lg btn-md btn btn-neutral w-[400px]">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default LoginForm