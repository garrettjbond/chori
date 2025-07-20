import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFlipboard } from '@fortawesome/free-brands-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser'

const Navbar = () => {
  return (
    <div className="fixed top-0 h-16 left-0 w-full grid grid-cols-6 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-3 p-2 border-b-3 border-lavender">
        <div className='flex items-center justify-start'>
            {/* <img className="w-10 h-10" src={logo} alt="logo" /> */}
            <FontAwesomeIcon icon={faFlipboard} className="text-4xl" />
            <h1 className="hidden lg:block text-4xl font-bold pl-2">Chori</h1>
        </div>
        <form className='col-span-4 lg:col-span-3 xl:col-span-2 2xl:col-span-1 flex items-center'>
            <div className="relative w-full">
                <span className="hidden md:block md:absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FontAwesomeIcon icon={faSearch} className="text-lg" />
                </span>
                <input
                    className="rounded-full border-2 text-black border-gray-300 h-10 pl-3 md:pl-10 w-full"
                    type="text"
                    placeholder="Search"
                />
            </div>
        </form>
        <div className='flex items-center justify-end'>
            <FontAwesomeIcon className='text-4xl text-nurple' icon={faCircleUser}/>
        </div>
    </div>
  )
}

export default Navbar