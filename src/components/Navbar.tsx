import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faFlipboard } from '@fortawesome/free-brands-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser'
import { Link } from 'react-router-dom';
import { useState } from 'react';

type NavbarProps = {
    onSearchChange: (term: string) => void;
  }


const Navbar = ({onSearchChange}: NavbarProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onSearchChange(e.target.value);
    };
    
  return (
    <div className="fixed top-0 h-16 left-0 w-full flex justify-between p-2 border-b-5 border-lavender xl:px-60 lg:px-30 md:px-20">
        <div className='flex items-center justify-start'>
            <Link to="/" className='cursor-pointer hover:text-nurple duration-300'>
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faFlipboard} className="text-4xl" />
                    <h1 className="hidden lg:block text-4xl font-bold pl-2">Chori</h1>
                </span>
            </Link>
        </div>
        <form className='col-span-4 lg:col-span-3 xl:col-span-2 2xl:col-span-1 flex flex-1 max-w-2/3 lg:max-w-1/2 xl:max-w-1/3 items-center'>
            <div className="relative w-full">
                <span className="hidden md:block md:absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FontAwesomeIcon icon={faSearch} className="text-lg" />
                </span>
                <input
                    className="rounded-full border-2 text-black border-gray-300 h-10 pl-3 md:pl-10 w-full"
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={inputValue}
                />
            </div>
        </form>
        <div className='flex items-center justify-end'>
            <FontAwesomeIcon className='text-4xl text-nurple hover:text-lightNurple duration-300 cursor-pointer' icon={faCircleUser}/>
        </div>
    </div>
  )
}

export default Navbar