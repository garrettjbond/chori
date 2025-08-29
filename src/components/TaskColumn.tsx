import { faClose, faEllipsis, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./Task";
import { useState } from "react";
import CreateTask from "./CreateTask";

type TaskColumnProps = {
    children: React.ReactNode;
    className?: string;
    onTaskClick?: () => void;
}

function TaskColumn({ children, className, onTaskClick, ...props }: TaskColumnProps) {
    const [isColumnOptionsOpen, setIsColumnOptionsOpen] = useState<boolean>(false);

    const toggleColumnOptions = () => {
        setIsColumnOptionsOpen(prev => !prev)
    }

    return (
        <div className={`w-75 h-fit font-semibold rounded-md mb-5 bg-taskBackground flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>
            <div className="columnHeader bg-taskHeader border border-gray-300 rounded-md relative">
                <div className="cursor-pointer hover:text-nurple duration-300 flex justify-between items-center px-3 rounded-md h-11">
                    <h2>Column Title</h2>
                    <FontAwesomeIcon onClick={toggleColumnOptions} icon={faEllipsis} className="hover:animate-pulse text-lg" />
                </div>
                {
                    isColumnOptionsOpen &&
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 min-w-64 z-10">
                        <div className="flex justify-between items-center mb-2">
                            <div className="invisible"></div>
                            <h3 className="font-semibold">List Actions</h3>
                            <FontAwesomeIcon icon={faClose} onClick={toggleColumnOptions} className="cursor-pointer hover:text-darkAsh"></FontAwesomeIcon>
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center justify-between text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer">
                                Rename Column <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                            </li>
                            <li className="flex items-center justify-between text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer">
                                Delete Column <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </li>
                        </ul>
                    </div>
                }
            </div>
            <Task children={undefined}></Task>
            <Task children={undefined}></Task>
            <Task children={undefined}></Task>
            <CreateTask isOpen={false}></CreateTask>
        </div>
    );
}

export default TaskColumn