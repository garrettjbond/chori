import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./Task";
import { useState } from "react";
import CreateTask from "./CreateTask";
import { useKanbanStore, type Column, type Task as TaskType } from '../global/kanbanStore.ts'
import TaskColumnOptionsModal from "./TaskColumnOptionsModal.tsx";
import { useModalStore } from "../global/modalStore.ts";

type TaskColumnProps = {
    onTaskOpen: () => void;
    search: string;
    key: string;
    title: string;
    className?: string;
    column: Column;
}

const TaskColumn = ({ onTaskOpen, search, key, title, className, column, ...props }: TaskColumnProps) => {
    const {openModal, modals, closeModal} = useModalStore();
    const { setActiveColumnId, activeColumnId} = useKanbanStore();
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false)
    const filteredTasks = column.tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className={`w-75 h-fit font-semibold rounded-md mb-5 bg-taskBackground flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>
            <div className="columnHeader bg-taskHeader border border-gray-300 rounded-md relative">
                <div className="cursor-pointer hover:text-nurple duration-300 flex justify-between items-center px-3 rounded-md h-11">
                    <h2>{title}</h2>
                    <FontAwesomeIcon onClick={() => {
                        setIsRenameOpen(false)
                        setActiveColumnId(column.id)
                        openModal("columnOptions");
                    }} icon={faEllipsis} className="hover:animate-pulse text-lg" />
                </div>
                <TaskColumnOptionsModal isRename={isRenameOpen}
                    setIsRename={setIsRenameOpen} colId={column.id} isOpen={modals.columnOptions && activeColumnId === column.id} onClose={() => closeModal('columnOptions')} />
            </div>
            {
                filteredTasks
                    .map((task: TaskType) => (
                        <Task task={task} taskId={task.id} onOpen={onTaskOpen} key={task.id} title={task.title} columnId={column.id} />
                    ))
            }
            <CreateTask colId={column.id} isOpen={modals.createTask && activeColumnId === column.id}></CreateTask>
        </div>
    );
}

export default TaskColumn;