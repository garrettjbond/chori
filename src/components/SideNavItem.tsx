import { faPeopleGroup, faGear, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type SideNavItemProps = {
  children?: React.ReactNode;
};

const SideNavItem: React.FC<SideNavItemProps> = ({ children }) => {
    const [isColumnCaretRotated, setIsColumnCaretRotated] = useState<boolean>(false)

    function toggleColumnCaret() {
        setIsColumnCaretRotated(prev => !prev);
    }

  return (
    <div>
        <p onClick={toggleColumnCaret} className='sideNavLinkList cursor-pointer hover:text-nurple duration-300'>Board {children}<span className='pl-2'><FontAwesomeIcon className={`transition-transform duration-300 ${isColumnCaretRotated ? 'rotate-90' : ''}`} icon={faCaretRight} /></span></p>
        {
            isColumnCaretRotated &&
            <div className="pl-4">
                <p className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300'> <span className='pr-2'><FontAwesomeIcon icon={faPeopleGroup} /></span>Members</p>
                <p className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300'> <span className='pr-2'><FontAwesomeIcon icon={faGear} /></span>Settings</p>
            </div>
        }
    </div>
  );
};

export default SideNavItem;
