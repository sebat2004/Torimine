import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import WorkspaceNavbar from '../components/WorkspaceNavbar'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Workspace = () => {  
  const { user } = useAuth();
  const navigator = useNavigate()

  useEffect(() => {
    console.log(user)
    if (!user.isAuthenticated) {
      navigator('/login')
    }
  }, [user])

  return (
    <>
        <div className="flex w-screen h-screen items-center">
          <Sidebar />
          <hr className="h-[100%] w-[1px] bg-zinc-300 border-0"></hr>
          <div className='flex flex-col h-screen w-[100%]'>
            <WorkspaceNavbar />
            <Outlet />
          </div>
        </div>
    </>
  )
}

export default Workspace