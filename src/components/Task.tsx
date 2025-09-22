import { faCircleUser, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useKanbanStore } from "../global/kanbanStore";
import { useModalStore } from "../global/modalStore";
import TaskOptionsModal from "./TaskOptionsModal";
import { useState } from "react";
import type { Task as TaskType } from "../global/kanbanStore";

type TaskProps = {
    onOpen: () => void;
    task: TaskType;
    title: string;
    taskId: string;
    columnId: string;
    className?: string;
}

const Task = ({ onOpen, task, taskId, title, columnId, className }: TaskProps) => {
    const { setActiveTaskId, setActiveColumnId, activeTaskId } = useKanbanStore();
    const {modals, closeModal, openModal} = useModalStore();
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false)

    return (
        <div className="relative">
            <div className={`task group flex justify-between items-center cursor-pointer hover:text-nurple duration-300 bg-white border border-gray-300 px-3 rounded-md h-11 ${className || ''}`}
            >
                <div onClick={() => {
                    onOpen();
                    setActiveColumnId(columnId);
                    setActiveTaskId(taskId);
                }} className="relative flex items-center">
                    <FontAwesomeIcon className='text-2xl text-darkAsh pr-2' icon={faCircleUser} />
                    <p>{title}</p>
                </div>
                <div className="absolute bottom-full flex gap-1">
                {
                    task?.tags?.map((tag)=>
                        <div className="bg-red-300 w-7 h-1 rounded-t-full" style={{ backgroundColor: tag.color }}></div>
                    )
                }
                </div>
                <FontAwesomeIcon 
                    icon={faEllipsis} 
                    onClick={()=> {
                        setIsRenameOpen(false);
                        setActiveColumnId(columnId);
                        setActiveTaskId(taskId);
                        openModal("taskOptions");
                    }} 
                    className="opacity-0 group-hover:opacity-100 hover:animate-pulse text-lg transition-opacity duration-200 cursor-pointer" 
                />
            </div>
            <TaskOptionsModal
                isRename = {isRenameOpen}
                setIsRename = {setIsRenameOpen}
                columnId={columnId}
                isOpen={modals.taskOptions && activeTaskId === taskId}
                onClose={() => closeModal('taskOptions')}
                taskId={taskId}
            />

        </div>

    );
}

export default Task