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
    index: number;
    className?: string;
};

const Task = ({ onOpen, index, task, taskId, title, columnId, className }: TaskProps) => {
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

            <div {...listeners} {...attributes} className="mr-2 cursor-move flex items-center">
                <FontAwesomeIcon className="text-2xl text-darkAsh" icon={faGripVertical} />
            </div>
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
            <FontAwesomeIcon
                icon={faEllipsis}
                onClick={() => {
                    setIsRenameOpen(false);
                    setActiveColumnId(columnId);
                    setActiveTaskId(taskId);
                    openModal("taskOptions");
                }}
                className="text-lg cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-nurple"
            />
        </div>
        <div className="absolute bottom-full flex gap-1 left-2">
            {task?.tags?.map((tag, idx) => (
                <div key={idx} className="w-7 h-1 rounded-t-full" style={{ backgroundColor: tag.color }} />
            ))}
        </div>

        <TaskOptionsModal
            isRename={isRenameOpen}
            setIsRename={setIsRenameOpen}
            columnId={columnId}
            index={index}
            taskId={taskId}
            isOpen={modals.taskOptions && activeTaskId === taskId}
            onClose={() => closeModal("taskOptions")}
        />
    </div>


    );
};

export default Task;
