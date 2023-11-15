import { VscAccount } from 'react-icons/vsc'
import { useContext } from 'react'
import { useAuth } from '../hooks/useAuth'
import { IoExitOutline } from 'react-icons/io5'

const WorkspaceNavbar = () => {
    const {user, logout} = useAuth()
    return (
    <div className={`flex shadow-md py-3 px-10 gap-5 bg-[#f4f5f5] duration-150 w-[100%] h-[88px] items-center`}>
        <div className='flex ml-auto gap-7 p-2'>
            <div className='nav-item-container items-center'>
                <h1>{user.username}</h1>
                <VscAccount className='text-3xl' />
            </div>
        </div>
        <div className='flex gap-7 p-2'>
            <div className='nav-item-container items-center justify-center' onClick={() => {
                logout()
            }}>
                <h1>Logout</h1>
                <IoExitOutline className='text-3xl' />
            </div>
        </div>
    </div>
    )
}

export default WorkspaceNavbar