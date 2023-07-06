import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
    <div className='flex py-3 px-10 bg-gray-100 w-screen'>
        <div className='flex hover:scale-110 duration-150'>
            <Link to='/'>
                <div className="flex pt-[8px] logo">
                    <h1>Tori</h1>
                    <h1>mine</h1>
                </div>
            </Link>
        </div>
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
    </div>
    )
}

export default Navbar