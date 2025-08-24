import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons/faPeopleGroup";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons/faWindowMaximize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
    const [isColumnCaretRotated, setIsColumnCaretRotated] = useState<boolean>(false)

    function toggleColumnCaret() {
        setIsColumnCaretRotated(prev => !prev);
    }



    return (
        <div className='sideNavContainer hidden xl:block xl:w-1/5 lg:text-2xl xl:flex xl:flex-col xl:gap-5'>
            <p className='sideNavLink cursor-pointer hover:text-nurple duration-300'> <span className='pr-2'><FontAwesomeIcon icon={faHouse} /></span>Home</p>
            <Link
                to="/board/1"  // or the appropriate boardId
                className="sideNavLink cursor-pointer hover:text-nurple transition-colors duration-300"
            >
                <span className="pr-2"><FontAwesomeIcon icon={faWindowMaximize} /></span>Boards
            </Link>
            <hr className="text-ash" />
            <p onClick={toggleColumnCaret} className='sideNavLinkList cursor-pointer hover:text-nurple duration-300'>Board A<span className='pl-2'><FontAwesomeIcon className={`transition-transform duration-300 ${isColumnCaretRotated ? 'rotate-90' : ''}`} icon={faCaretRight} /></span></p>
            {
                isColumnCaretRotated &&
                <div className="pl-4">
                    <p className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300'> <span className='pr-2'><FontAwesomeIcon icon={faPeopleGroup} /></span>Members</p>
                    <p className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300'> <span className='pr-2'><FontAwesomeIcon icon={faGear} /></span>Settings</p>
                </div>
            }
            <p onClick={toggleColumnCaret} className='sideNavLinkList cursor-pointer hover:text-nurple duration-300'>Board B<span className='pl-2'><FontAwesomeIcon className={`transition-transform duration-300 ${isColumnCaretRotated ? 'rotate-90' : ''}`} icon={faCaretRight} /></span></p>
        </div>
    );
};

export default SideNav;
