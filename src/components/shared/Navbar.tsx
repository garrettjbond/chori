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
    <header className="fixed top-0 h-16 left-0 w-full flex justify-between p-2 border-b-5 border-lavender xl:px-60 lg:px-30 md:px-20">
        <div className='flex items-center justify-start'>
            <Link to="/" aria-label='Chori home' className='cursor-pointer hover:text-nurple focus:text-nurple duration-300 focus:outline-none focus:ring-2 focus:ring-nurple rounded'>
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faFlipboard} className="text-4xl" aria-hidden="true"/>
                    <span className="hidden lg:block text-4xl font-bold pl-2">Chori</span>
                </span>
            </Link>
        </div>
        <form role='search' aria-label='Search boards' className='col-span-4 lg:col-span-3 xl:col-span-2 2xl:col-span-1 flex flex-1 max-w-2/3 lg:max-w-1/2 xl:max-w-1/3 items-center'>
            <div className="relative w-full">
                <span className="hidden md:block md:absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true">
                    <FontAwesomeIcon icon={faSearch} className="text-lg" />
                </span>
                <label htmlFor="board-search" className='sr-only'>Search boards</label>
                <input
                    id='board-search'
                    className="rounded-full border-2 text-black border-gray-300 focus:border-nurple focus:outline-none h-10 pl-3 md:pl-10 w-full"
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={inputValue}
                />
            </div>
        </form>
        <button aria-label='User profile' className='flex items-center justify-end focus:outline-none focus:ring-2 focus:ring-nurple rounded-full'>
            <FontAwesomeIcon aria-hidden="true" className='text-4xl text-nurple hover:text-lightNurple duration-300 cursor-pointer' icon={faCircleUser}/>
        </button>
    </header>
  )
}

export default Navbar