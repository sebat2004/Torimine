import { Link } from "react-router-dom"

const RegisterForm = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <div className="py-6 px-10 drop-shadow-lg flex rounded-lg flex-col bg-base-200 lg:w-[40vw] gap-6">
                <h1 className="text-2xl font-semibold">Create an account with us!</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-left">Username</label>
                        <input className="input" type="text" placeholder="Username" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-left">Email</label>
                        <input className="input" type="email" placeholder="name@company.com" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-left">Password</label>
                        <input className="input" type="password" placeholder="Password" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-left">Confirm Password</label>
                        <input className="input" type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="flex flex-col self-center items-center pt-3 gap-4">
                        <Link to="/login" className="text-sm">Already have an account? Click to login.</Link>
                        <Link to="/login" className="shadow-lg btn-md btn btn-neutral w-[400px]">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default RegisterForm