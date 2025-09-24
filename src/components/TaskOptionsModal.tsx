import { faClose, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useKanbanStore } from '../global/kanbanStore';
import { useState } from 'react';
import Button from './Button';
import Swal from 'sweetalert2';

type TaskOptionsModalProps = {
    isOpen: boolean;
    isRename: boolean;
    setIsRename: React.Dispatch<React.SetStateAction<boolean>>;
    taskId: string;
    columnId: string;
    onClose: () => void;
    className?: string;
};

const TaskOptionsModal = ({ isRename, setIsRename, taskId, columnId, isOpen, onClose, className }: TaskOptionsModalProps) => {
    const { activeTaskId, activeBoardId, deleteTask, activeColumnId, renameTask, getActiveTask } = useKanbanStore();
    const [renameInputValue, setRenameInputValue] = useState<string>("");

    const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRenameInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            renameInputValue.trim() &&
            activeBoardId &&
            activeColumnId &&
            activeTaskId
        ) {
            renameTask(
                activeColumnId,
                activeTaskId,
                renameInputValue.trim()
            );
            setRenameInputValue("");
            setIsRename(false);
            onClose();
        }
    }
    const activeTask = getActiveTask();
    if (!activeTask) return null;

    return (<div>
        {
            isOpen &&
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 min-w-64 z-10">
                <div className="flex justify-between items-center mb-2">
                    <div className="invisible"></div>
                    <h3 className="font-semibold">Task Actions</h3>
                    <FontAwesomeIcon icon={faClose} onClick={() => { onClose(); setIsRename(false) }} className="cursor-pointer hover:text-darkAsh"></FontAwesomeIcon>
                </div>
                <ul className="flex flex-col gap-2">
                    <li onClick={() => setIsRename(prev => !prev)} className="flex items-center justify-between text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer">
                        Rename Task <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                    </li>
                    {isRename &&
                        <form onSubmit={handleSubmit} className='flex mx-1 gap-5 sm:px-2'>
                            <input value={renameInputValue} onChange={handleRenameChange} type="text" placeholder="task title" className='pl-3 h-10 bg-white border border-gray-300 w-full rounded-sm' />
                            <Button type='submit' className='bg-nurple text-white hover:bg-lightNurple duration-300 cursor-pointer'>Save</Button>
                        </form>}                    <li
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
                                            onClose();
                                            deleteTask(columnId, taskId);

                                            Swal.fire({
                                                title: "Deleted!",
                                                text: "Your task has been deleted.",
                                                icon: "success"
                                            });
                                        }
                                    }
                                });
                            }}
                            className="flex items-center justify-between text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer"
                        >
                        Delete Task <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </li>
                </ul>
            </div>
        }
    </div>
    );
};

export default TaskOptionsModal;
