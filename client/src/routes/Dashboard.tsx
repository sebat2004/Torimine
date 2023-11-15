// imports inbox icon from react icons
import { VscBell } from "react-icons/vsc"
import { useAuth } from "../hooks/useAuth"

const Dashboard = () => {
  const {user} = useAuth()

  return (
    <>
      <div className="py-10 px-10 flex flex-col">
        <div className="pb-5">
          <h1 className="header">Dashboard</h1>
        </div>
        <div className="w-[100%] bg-[#f8f8fa] py-8 px-7 rounded-md">
          <h1 className="text-2xl font-semibold">Latest Activity</h1>
        </div>
      </div>
    </>
  )
}

export default Dashboard
