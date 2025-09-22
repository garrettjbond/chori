import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { useState } from "react";
import { useKanbanStore, type Column, type Task as TaskType } from "../global/kanbanStore.ts";
import TaskColumnOptionsModal from "./TaskColumnOptionsModal.tsx";
import { useModalStore } from "../global/modalStore";
import { useDroppable, useDraggable } from "@dnd-kit/core";

type TaskColumnProps = {
    onTaskOpen: () => void;
    search: string;
    key: string;
    title: string;
    className?: string;
    column: Column;
};

const TaskColumn = ({ onTaskOpen, search, title, className, column, ...props }: TaskColumnProps) => {
    const { openModal, modals, closeModal } = useModalStore();
    const { setActiveColumnId, activeColumnId } = useKanbanStore();
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false);

    const filteredTasks = column.tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    // Draggable for moving the column
    const { setNodeRef: setDraggableRef, listeners, attributes, transform, isDragging } = useDraggable({
        id: column.id,
    });

    // Droppable for other columns to be dropped onto this position
    const { setNodeRef: setColumnDroppableRef, isOver: isColumnOver } = useDroppable({
        id: column.id, // This will be the drop target for other columns
    });

    // Droppable for tasks to be dropped into this column
    const { setNodeRef: setTaskDroppableRef, isOver: isTaskOver } = useDroppable({
        id: column.id + "-drop",
    });

    // Combine the draggable and column droppable refs
    const combinedRef = (node: HTMLDivElement | null) => {
        setDraggableRef(node);
        setColumnDroppableRef(node);
    };

    const columnStyle = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging ? 50 : "auto",
    };

    return (
        <div
            ref={combinedRef}
            style={columnStyle}
            className={`w-75 h-fit font-semibold rounded-md mb-5 bg-taskBackground flex flex-shrink-0 flex-col gap-2 ${
                isColumnOver ? 'ring-2 ring-nurple' : ''
            } ${className || ""}`}
            {...props}
        >
            <div className="columnHeader bg-taskHeader border border-gray-300 rounded-md relative">
                <div
                    {...listeners}
                    {...attributes}
                    className="flex justify-between items-center px-3 rounded-md h-13 cursor-move text-lg"
                >
                    <h2>{title}</h2>
                </div>

                <FontAwesomeIcon
                    onClick={() => {
                        setIsRenameOpen(false);
                        setActiveColumnId(column.id);
                        openModal("columnOptions");
                    }}
                    icon={faEllipsis}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:animate-pulse text-lg cursor-pointer"
                />

                <TaskColumnOptionsModal
                    isRename={isRenameOpen}
                    setIsRename={setIsRenameOpen}
                    colId={column.id}
                    isOpen={modals.columnOptions && activeColumnId === column.id}
                    onClose={() => closeModal("columnOptions")}
                />
            </div>
            
            <div
                ref={setTaskDroppableRef}
                className={`tasks-container flex flex-col gap-2 p-2 rounded-md ${
                    isTaskOver && "bg-lavender"
                }`}
            >
                {filteredTasks.map((task: TaskType) => (
                    <Task
                        key={task.id}
                        task={task}
                        taskId={task.id}
                        columnId={column.id}
                        title={task.title}
                        onOpen={onTaskOpen}
                    />
                ))}

                <CreateTask colId={column.id} isOpen={modals.createTask && activeColumnId === column.id} />
            </div>
        </div>
    );
};

export default TaskColumn;