import { AiOutlineHome, AiOutlineInfoCircle  } from "react-icons/ai";
import { BsCalendarWeek } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { NavbarContext } from "../App";

const Navbar = () => {

  const {isOpen, setOpen} = useContext(NavbarContext)

  return (
    <>
    <div className="flex">
      <div className={`flex px-6 flex-col gap-5 pl-6 h-screen pt-8 bg-zinc-900 ${isOpen ? "w-[194px]" : "w-[90px]"} duration-150`}>
          <div className={`flex pl-2 rounded-md w-min duration-200 cursor-pointer ${isOpen ? "self-end" : "self-end pr-[10px]"}`}>
            <h1 className={`logo self-start pr-7 hover:scale-110 duration-150 text-xl ${isOpen ? "scale-100" : "scale-0"}`}>Torimine</h1>
            <RxHamburgerMenu className={`text-2xl duration-150 hover:scale-125 ${isOpen && "rotate-180"}`} onClick={() => setOpen(!isOpen)} />
          </div>
          <hr className="h-px my-3 bg-zinc-600 border-0 m-[-23px]"></hr>
          <Link to={"/"} state={isOpen}>
          <div className={`nav-item-container`} >
            <div className="ml-[1px] h-max self-center">
              <AiOutlineHome className={`text-2xl`} />
            </div>
            <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>Home</h1>
          </div>
          </Link>
          <Link to="/login" state={isOpen}>
          <div className={`nav-item-container`} >
            <div className="ml-[1px] h-max self-center">
              <AiOutlineInfoCircle className="text-2xl" />
            </div>
            <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>About</h1>
          </div>
          </Link>
          <div className={`nav-item-container`} >
            <div className="ml-[1px] h-max self-center">
              <LuLayoutDashboard className="text-2xl" />
            </div>
            <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>Dashboard</h1>
          </div>
          <div className={`nav-item-container`} >
            <div className="ml-[1px] h-max self-center">
              <BsCalendarWeek className="text-2xl" />
            </div>
            <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>Schedule</h1>
          </div>
          <hr className="h-px my-3 bg-zinc-600 border-0 mx-[-23px] mt-auto"></hr>
          <div className={`nav-item-container mb-7`} >
            <div className="ml-[1px] h-max self-center">
              <VscAccount className="text-2xl" />
            </div>
            <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>Account</h1>
          </div>
      </div>
    </div>
    </>
  )
}

export default Navbar