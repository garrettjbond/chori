import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons/faWindowMaximize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SideNavItem from "./SideNavItem";

const SideNav = () => {

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
            <SideNavItem>Board A</SideNavItem>
            <SideNavItem>Board B</SideNavItem>
        </div>
    );
};

export default SideNav;
