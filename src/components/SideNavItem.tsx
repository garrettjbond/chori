import { faPeopleGroup, faGear, faCaretRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useKanbanStore } from "../global/kanbanStore";
import { useModalStore } from "../global/modalStore";
import Swal from "sweetalert2";

type SideNavItemProps = {
  itemId: string;
  children?: React.ReactNode;
};

const SideNavItem = ({ itemId, children }: SideNavItemProps) => {
  const [isColumnCaretRotated, setIsColumnCaretRotated] = useState<boolean>(false)
  const { deleteBoard, setActiveBoardId, activeBoardId } = useKanbanStore();
  const { openModal } = useModalStore();


  function toggleColumnCaret() {
    setIsColumnCaretRotated(prev => !prev);
  }

  return (
    <div>
      <p onClick={() => { toggleColumnCaret(); setActiveBoardId(itemId) }} className='sideNavLinkList cursor-pointer hover:text-nurple duration-300 lg:text-xl'>{children}<span className='pl-2'><FontAwesomeIcon className={`transition-transform duration-300 ${isColumnCaretRotated ? 'rotate-90' : ''}`} icon={faCaretRight} /></span></p>
      {
        isColumnCaretRotated &&
        <div className="pl-4">
          <p className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300 lg:text-md'> <span className='pr-2'><FontAwesomeIcon icon={faPeopleGroup} /></span>Members</p>
          <p onClick={() => { openModal('boardOptions'); toggleColumnCaret(); }} className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300 lg:text-md'> <span className='pr-2'><FontAwesomeIcon icon={faGear} /></span>Settings</p>
          <p
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  if (activeBoardId) {
                    toggleColumnCaret();
                    deleteBoard(itemId)
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your board has been deleted.",
                      icon: "success"
                    });
                  }
                }
              });
            }}
            className='sideNavLinkListItem cursor-pointer hover:text-nurple duration-300 lg:text-md'> <span className='pr-2'><FontAwesomeIcon icon={faTrash} /></span>Delete</p>
        </div>
      }
    </div>
  );
};

export default SideNavItem;
