import logo from '../assets/choriLogo.png'
import userProfile from '../assets/userProfile.png'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-2 border-b border-gray-300">
        <div>
            <img className="w-10 h-10" src={logo} alt="logo" />
            <h1 className="hidden md:block text-2xl font-bold">Chori</h1>
        </div>
        <form>
            <input className='rounded-md border-2 border-gray-300 p-2' type="text" placeholder="Search" />
        </form>
        <img className='w-10 h-10' src={userProfile} alt="user profile" />
    </div>
  )
}

export default Navbar