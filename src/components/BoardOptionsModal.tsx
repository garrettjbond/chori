import { faClose, faPenToSquare, faPeopleGroup, faStar, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useKanbanStore, type Board } from '../global/kanbanStore';
import { useModalStore } from '../global/modalStore';
import Swal from 'sweetalert2';

type BoardOptionsModalProps = {
    className?: string;
}

const BoardOptionsModal = ({ className, ...props }: BoardOptionsModalProps) => {
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false)
    const [isSharingOpen, setIsSharingOpen] = useState<boolean>(false)
    const { toggleFavoriteBoard, activeBoardId, boards, getActiveBoard, deleteBoard, renameBoard } = useKanbanStore();
    const { closeModal, modals } = useModalStore();
    const [renameInputValue, setRenameInputValue] = useState<string>("");

    const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRenameInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (renameInputValue.trim() && activeBoardId) {
            renameBoard(activeBoardId, renameInputValue.trim());
            setRenameInputValue("");
            setIsRenameOpen(false);
        }
    }

    const activeBoard = getActiveBoard();
    if (!activeBoard) return null;


    return (
        <>
            {modals.boardOptions &&
                <div className='fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-[10px] z-[1040]'>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className={`rounded-lg bg-white w-4/5 h-fit max-w-lg xl:w-3/5 2xl:w-1/2 ${className}`} {...props}>
                            <div className="modalHeader flex justify-between border-lavender border-b-4 px-5 h-15 items-center font-semibold text-xl">
                                <h2>Board Options</h2>
                                <Button
                                    size='custom'
                                    className='hover:text-ash duration-300'
                                    onClick={() => {
                                        setIsRenameOpen(false);
                                        setIsSharingOpen(false);
                                        closeModal("boardOptions");
                                    }}
                                >
                                    <FontAwesomeIcon icon={faClose} />
                                </Button>
                            </div>
                            <div className='px-5 sm:px-10 md:px-20 py-5 h-full w-full flex flex-col '>
                                <ul className="flex flex-col gap-2 text-lg pb-2">
                                    <li
                                        onClick={() => {
                                            setIsRenameOpen(prev => !prev);
                                            setIsSharingOpen(false);
                                        }}
                                        className={`flex items-center justify-between p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer ${isRenameOpen ? 'text-nurple' : 'text-gray-500'}`}
                                    >
                                        Rename Board <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                    </li>
                                    {isRenameOpen &&
                                        <form onSubmit={handleSubmit} className='flex mx-1 gap-5 sm:px-5'>
                                            <input required maxLength={15} value={renameInputValue} onChange={handleRenameChange} type="text" placeholder={activeBoard.title} className='pl-3 h-10 bg-white border border-gray-300 w-full rounded-sm' />
                                            <Button type='submit' className='bg-nurple text-white hover:bg-lightNurple duration-300 cursor-pointer'>Save</Button>
                                        </form>}
                                    <li onClick={() => activeBoardId && toggleFavoriteBoard(activeBoardId)} className="flex items-center justify-between text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer">
                                        Favorite Board <FontAwesomeIcon className={`${boards.find((board: Board) => board.id === activeBoardId)?.favorite ? 'text-nurple hover:text-lavender' : 'text-darkAsh hover:text-lavender'}`} icon={faStar}></FontAwesomeIcon>
                                    </li>
                                    <Link
                                        to="/"
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
                                                        closeModal('boardOptions');
                                                        deleteBoard(activeBoardId);

                                                        Swal.fire({
                                                            title: "Deleted!",
                                                            text: "Your board has been deleted.",
                                                            icon: "success"
                                                        });
                                                    }
                                                }
                                            });
                                        }}
                                        className="flex items-center justify-between text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer"
                                    >
                                        Delete Board <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </Link>
                                    <li
                                        onClick={() => {
                                            setIsRenameOpen(false);
                                            setIsSharingOpen(prev => !prev);
                                        }}
                                        className={`flex items-center justify-between p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer ${isSharingOpen ? 'text-nurple' : 'text-gray-500'}`}
                                    >
                                        Share Board <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
                                    </li>
                                    {isSharingOpen &&
                                        <form className='flex mx-1 gap-5 sm:px-5'>
                                            <input required type="text" placeholder='email' className='pl-3 h-10 bg-white border border-gray-300 w-full rounded-sm' />
                                            <Button
                                                onClick={() => {
                                                    const confirmed = window.confirm("This functionality has not been implemented yet.");

                                                    if (activeBoardId && confirmed) {
                                                        closeModal('boardOptions');
                                                        setIsSharingOpen(false)
                                                    }
                                                }}


                                                type='button' className='bg-nurple text-white hover:bg-lightNurple duration-300 cursor-pointer'>Send</Button>
                                        </form>}
                                    <li className="flex items-center justify-between text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer">
                                        Members <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default BoardOptionsModal;