import logo from '../assets/choriLogo.png'
import userProfile from '../assets/userProfile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div className="fixed top-0 lg:h-16 left-0 w-full grid grid-cols-6 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-3 p-2 border-b border-gray-300">
        <div className='flex items-center justify-start'>
            <img className="w-10 h-10" src={logo} alt="logo" />
            <h1 className="hidden lg:block text-4xl font-bold pl-2">Chori</h1>
        </div>
        <form className='col-span-4 lg:col-span-3 xl:col-span-2 2xl:col-span-1 flex items-center'>
            <div className="relative w-full">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                </span>
                <input
                    className="rounded-full border-2 border-gray-300 p-2 pl-10 w-full"
                    type="text"
                    placeholder="Search"
                />
            </div>
        </form>
        <div className='flex items-center justify-end'>
            <img className='w-10 h-10' src={userProfile} alt="user profile" />
        </div>
    </div>
  )
}

export default Navbar