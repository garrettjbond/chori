import { faCaretRight, faEllipsis, faGear, faPeopleGroup, faStar, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "./Button"
import { useState } from "react";

const Taskbar = () => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const toggleFavorite = () => setIsFavorite(prev => !prev);
    
    return (
        <div className="fixed top-16 h-13 left-0 w-full pl-4 pr-2 border-b-5 border-lavender flex justify-between items-center xl:px-70 lg:px-35 md:px-25">
            <div className="flex items-center gap-2">
                <p className="font-semibold">Board A</p>
                <div className="hidden sm:block sm:flex gap-2">
                    <p className="cursor-pointer hover:text-nurple duration-300"><span className='pl-3 pr-1'><FontAwesomeIcon className="text-darkAsh" icon={faCaretRight}></FontAwesomeIcon></span></p>
                    <p className="cursor-pointer hover:text-nurple duration-300"><span className='pl-3 pr-1'><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></span>Settings</p>
                    <p className="cursor-pointer hover:text-nurple duration-300"><span className='pl-3 pr-1'><FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon></span>Members</p>
                    <p className={`cursor-pointer duration-300 ${isFavorite ? 'text-nurple hover:text-lavender' : 'text-darkAsh hover:text-lavender'}`} onClick={toggleFavorite}><span className='pl-3 pr-1'><FontAwesomeIcon icon={faStar}/></span>Favorite</p>
                </div>
            </div>
            <div className="flex items-center">
                <span className="md:hidden text-2xl pr-2"><FontAwesomeIcon icon={faEllipsis} />
                </span>
                <Button size="medium" className="hidden md:block bg-nurple text-white hover:bg-lightNurple duration-300 cursor-pointer"><FontAwesomeIcon icon={faUserPlus} className="pr-1 text-sm "></FontAwesomeIcon>Share</Button>
            </div>
        </div>
    )
}

export default Taskbar