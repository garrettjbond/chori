import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons/faWindowMaximize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideNavItem from "./SideNavItem";
import { type Board } from "../global/kanbanStore";

type SideNavProps = {
    boards: Board[];
}


const SideNav = ({boards}:SideNavProps ) => {
    return (
        <div className='sideNavContainer hidden xl:block xl:min-w-48 xl:w-1/5 xl:flex xl:flex-col xl:gap-5'>
            <p className='sideNavLink cursor-pointer hover:text-nurple duration-300 lg:text-2xl'> <span className='pr-2'><FontAwesomeIcon icon={faWindowMaximize} /></span>Boards</p>
            <hr className="text-ash" />
            {
                boards
                .map(i => (
                    <SideNavItem itemId = {i.id}>{i.title}</SideNavItem>
                ))
            }
        </div>
    );
};

export default SideNav;
