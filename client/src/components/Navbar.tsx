import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
    const {user} = useAuth()
    
    return (
    <div className='flex shadow-md py-3 px-10 bg-[#e6e8e8] w-screen'>
        <div className='flex hover:scale-110 duration-150'>
            <Link to='/'>
                <div className="flex pt-[8px] logo">
                    <h1>Workpulse</h1>
                </div>
            </Link>
        </div>
        {user.isAuthenticated ? 
            <div className='flex ml-auto pr-2 gap-7'>
                <div className="nav-item-container px-2">
                    <h1 className='text-lg'>{user.username}</h1>
                </div>
            </div>
            : 
            <div className='flex ml-auto pr-2 gap-7'>
                <Link to='/register'>
                    <div className="nav-item-container px-2">
                        <h1 className='text-lg'>Register</h1>
                    </div>
                </Link>
                <Link to='/login'>
                    <div className="nav-item-container px-2">
                        <h1 className='text-lg'>Login</h1>
                    </div>
                </Link>
            </div>
        }
    </div>
    )
}

export default Navbar