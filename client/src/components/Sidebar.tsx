import { BsCalendarWeek } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SidebarContext } from "../App"
import { IoPeopleOutline } from "react-icons/io5";

const Sidebar = () => {

  const {isOpen, setOpen} = useContext(SidebarContext)
  const [currentPage, setCurrentPage] = useState<string>('Dashboard')

  return (
    <>  
      <div className={`flex shadow-md px-6 pt-8 flex-col gap-5 h-screen ${isOpen ? "w-[194px]" : "w-[88px]"} duration-[175ms] bg-[#f4f5f5]`}>
          <div className={`flex rounded-md w-min duration-200 ${isOpen ? "self-end" : "self-end"}`}>
            <Link to='/' className={`mr-4 cursor-pointer`}>
              <h1 className={`logo hover:scale-105 duration-150 text-xl ${isOpen ? "scale-100" : "scale-0"}`}>Workpulse</h1>
            </Link>
            <RxHamburgerMenu className={`mr-2 text-2xl cursor-pointer duration-150 hover:scale-125 ${isOpen && "rotate-180"}`} onClick={() => setOpen(!isOpen)} />
          </div>
          <hr className="h-px my-2 bg-zinc-300 border-0 mx-[-25px]"></hr>
          <Link to="/workspace" onClick={() => setCurrentPage('Dashboard')}>
            <div className={`nav-item-container ${currentPage === 'Dashboard' ? 'text-[#5563be] font-extrabold' : ''}`} >
              <div className="pl-[4px] h-max self-center">
                <LuLayoutDashboard className="text-2xl" />
              </div>
              <h1 className={`nav-item-text duration-[65ms] ${isOpen ? "scale-100" : "scale-0"}`}>Dashboard</h1>
            </div>
          </Link>
          <Link to="/workspace/schedule" onClick={() => setCurrentPage('Schedule')}>
            <div className={`nav-item-container ${currentPage === 'Schedule' ? 'text-[#5563be] font-extrabold' : ''}`} >
              <div className="pl-[4px] h-max self-center">
                <BsCalendarWeek className="text-2xl" />
              </div>
              <h1 className={`nav-item-text duration-[65ms] ${isOpen ? "scale-100" : "scale-0"}`}>Schedule</h1>
            </div>
          </Link>
          <Link to="/workspace/people" onClick={() => setCurrentPage('People')}>
            <div className={`nav-item-container ${currentPage === 'People' ? 'text-[#5563be] font-extrabold' : ''}`}>
              <div className="pl-[4px] h-max self-center">
                <IoPeopleOutline className="text-2xl" />
              </div>
              <h1 className={`nav-item-text duration-[65ms] ${isOpen ? "scale-100" : "scale-0"}`}>People</h1>
            </div>
          </Link>
      </div>
    </>
  )
}

export default Sidebar