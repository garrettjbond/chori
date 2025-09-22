import { faPeopleGroup, faGear, faCaretRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useKanbanStore } from "../global/kanbanStore";
import { useModalStore } from "../global/modalStore";

type SideNavItemProps = {
  itemId: string;
  children?: React.ReactNode;
};

const SideNavItem = ({ itemId, children }: SideNavItemProps) => {
  const [isColumnCaretRotated, setIsColumnCaretRotated] = useState<boolean>(false)
  const { deleteBoard, setActiveBoardId } = useKanbanStore();
  const {openModal} = useModalStore();


  function toggleColumnCaret() {
    setIsColumnCaretRotated(prev => !prev);
  }

  return (
    <div>
      <p onClick={()=> {toggleColumnCaret(); setActiveBoardId(itemId)}} className='sideNavLinkList cursor-pointer hover:text-nurple duration-300 lg:text-xl'>{children}<span className='pl-2'><FontAwesomeIcon className={`transition-transform duration-300 ${isColumnCaretRotated ? 'rotate-90' : ''}`} icon={faCaretRight} /></span></p>
      {
        isColumnCaretRotated &&
        <div className="pl-4">
          <p className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300 lg:text-md'> <span className='pr-2'><FontAwesomeIcon icon={faPeopleGroup} /></span>Members</p>
          <p onClick={() => {openModal('boardOptions'); toggleColumnCaret();}} className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300 lg:text-md'> <span className='pr-2'><FontAwesomeIcon icon={faGear} /></span>Settings</p>
          <p onClick={() => {
            const confirmed = window.confirm("Are you sure you want to delete this item? This action cannot be undone.");
            if (confirmed) {
              toggleColumnCaret(); deleteBoard(itemId)
            }
          }} className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300 lg:text-md'> <span className='pr-2'><FontAwesomeIcon icon={faTrash} /></span>Delete</p>
        </div>
      }
    </div>
  );
};

export default SideNavItem;
