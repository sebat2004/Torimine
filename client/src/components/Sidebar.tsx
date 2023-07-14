import { BsCalendarWeek } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../App"
import { viewContext } from "../../routes/Workspace"

const Sidebar = () => {

  const {isOpen, setOpen} = useContext(SidebarContext)
  const {setCurrentView} = useContext(viewContext)

  return (
    <>  
      <div className={`flex shadow-md px-6 flex-col gap-5 pl-6 h-screen pt-8  ${isOpen ? "w-[194px]" : "w-[88px]"} duration-150 border-r-[1px] bg-[#e6e8e8]`}>
          <div className={`flex rounded-md w-min duration-200 ${isOpen ? "self-end" : "self-end"}`}>
            <Link to='/' className={`mr-6 cursor-pointer`}>
              <h1 className={`logo hover:scale-110 duration-150 text-xl ${isOpen ? "scale-100" : "scale-0"}`}>Torimine</h1>
            </Link>
            <RxHamburgerMenu className={`mr-2 text-2xl cursor-pointer duration-150 hover:scale-125 ${isOpen && "rotate-180"}`} onClick={() => setOpen(!isOpen)} />
          </div>
          <hr className="h-px my-1 bg-zinc-400 border-0 mx-[-23px]"></hr>
          <Link to="/workspace/dashboard" state={isOpen} onClick={() => setCurrentView('Dashboard')}>
            <div className={`nav-item-container`} >
              <div className="pl-[4px] h-max self-center">
                <LuLayoutDashboard className="text-2xl" />
              </div>
              <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>Dashboard</h1>
            </div>
          </Link>
          <Link to="/workspace/schedule" state={isOpen}>
            <div className={`nav-item-container`} >
              <div className="pl-[4px] h-max self-center">
                <BsCalendarWeek className="text-2xl" />
              </div>
              <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>Schedule</h1>
            </div>
          </Link>
          <hr className="h-px my-3 bg-zinc-400 border-0 mx-[-25px] mt-auto"></hr>
          <Link to="/workspace/account" state={isOpen}>
            <div className={`nav-item-container mb-7`} >
              <div className="pl-[4px] h-max self-center">
                <VscAccount className="text-2xl" />
              </div>
              <h1 className={`nav-item-text ${isOpen ? "scale-100" : "scale-0"}`}>Account</h1>
            </div>
          </Link>
      </div>
    </>
  )
}

export default Sidebar