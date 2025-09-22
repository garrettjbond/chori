import { faGripVertical, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useKanbanStore } from "../global/kanbanStore";
import { useModalStore } from "../global/modalStore";
import TaskOptionsModal from "./TaskOptionsModal";
import type { Task as TaskType } from "../global/kanbanStore";
import { useDraggable } from "@dnd-kit/core";

type TaskProps = {
    onOpen: () => void;
    task: TaskType;
    title: string;
    taskId: string;
    columnId: string;
    className?: string;
};

const Task = ({ onOpen, task, taskId, title, columnId, className }: TaskProps) => {
    const { setActiveTaskId, setActiveColumnId, activeTaskId } = useKanbanStore();
    const { modals, closeModal, openModal } = useModalStore();
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false);

    // Draggable task
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: taskId,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging ? 50 : "auto",
    };

    return (<div ref={setNodeRef} style={style} className="relative">
        <div className={`task group flex justify-between items-center bg-white border border-gray-300 px-3 rounded-md h-11 ${className || ''}`}>

            {/* Left side: drag handle */}
            <div {...listeners} {...attributes} className="mr-2 cursor-move flex items-center">
                <FontAwesomeIcon className="text-2xl text-darkAsh" icon={faGripVertical} />
            </div>

            {/* Middle: clickable area to open task modal */}
            <div
                onClick={() => {
                    onOpen();
                    setActiveColumnId(columnId);
                    setActiveTaskId(taskId);
                }}
                className="flex-grow cursor-pointer"
            >
                <p>{title}</p>
            </div>

            {/* Right: ellipsis button */}
            <FontAwesomeIcon
                icon={faEllipsis}
                onClick={() => {
                    setIsRenameOpen(false);
                    setActiveColumnId(columnId);
                    setActiveTaskId(taskId);
                    openModal("taskOptions");
                }}
                className="opacity-0 group-hover:opacity-100 hover:animate-pulse text-lg transition-opacity duration-200 cursor-pointer"
            />

        </div>

        {/* Task tags */}
        <div className="absolute bottom-full flex gap-1">
            {task?.tags?.map((tag, idx) => (
                <div key={idx} className="w-7 h-1 rounded-t-full" style={{ backgroundColor: tag.color }} />
            ))}
        </div>

        <TaskOptionsModal
            isRename={isRenameOpen}
            setIsRename={setIsRenameOpen}
            columnId={columnId}
            taskId={taskId}
            isOpen={modals.taskOptions && activeTaskId === taskId}
            onClose={() => closeModal("taskOptions")}
        />
    </div>


    );
};

export default Task;
