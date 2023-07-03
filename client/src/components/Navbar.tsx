import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
    <div className='flex py-3 px-10 bg-zinc-900 w-screen'>
        <div className='flex hover:scale-110 duration-150'>
            <Link to='/'>
                <div className="flex pt-[8px] logo">
                    <h1>Tori</h1>
                    <h1>mine</h1>
                </div>
            </Link>
        </div>
        <div className='flex ml-auto pr-2 gap-7'>
            <Link to='/about'>
            <div className="nav-item-container px-2">
                <h1 className='text-lg'>About</h1>
            </div>
            </Link>
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