import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div className="flex flex-col items-center py-16">
        <h1 className="header leading-[78px] text-5xl text-center lg:w-[50vw]">Empower your team and simplify management.</h1>
        <h2 className="text-center text-lg pt-6 px-18">Boost productivity and streamline operations with our innovative tools, empowering your team to achieve success effortlessly.</h2>
        <div className="flex pt-12">
            <Link to="/register" className="shadow-lg btn-md btn btn-neutral">Get Started</Link>
        </div>
    </div>
  )
}

export default Landing