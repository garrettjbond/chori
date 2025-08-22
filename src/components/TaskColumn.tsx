import { faClose, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import Task from "./Task";
import { useState } from "react";

type TaskColumnProps = {
    children: React.ReactNode;
    className?: string;
    onTaskClick?: () => void;
}

function TaskColumn({ children, className, onTaskClick, ...props }: TaskColumnProps) {
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

    function toggleCreateTaskForm() {
        setShowTaskForm(prev => !prev);
    }


    return (
        <div className={`w-75 h-fit font-semibold rounded-md mb-5 bg-taskBackground flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>
            <div className="columnHeader cursor-pointer hover:text-nurple duration-300 bg-taskHeader border border-gray-300 px-3 rounded-md h-11 flex justify-between items-center">
                <h2 contentEditable>Column Title</h2>
                <FontAwesomeIcon icon={faEllipsis} className="hover:animate-pulse text-lg" />
            </div>
            <Task onClick={onTaskClick} children={undefined}></Task>
            <Task onClick={onTaskClick} children={undefined}></Task>
            <Task onClick={onTaskClick} children={undefined}></Task>
            { showTaskForm ? (
                    <form className="rounded-md bg-taskBackground flex flex-col px-4 py-5">
                        <input type="text" placeholder={`Enter task name...`} className="pl-3 h-10 bg-white w-full rounded-sm" />
                        <div className="flex justify-between pt-5">
                            <Button className="bg-nurple text-white hover:bg-lightNurple duration-300">Add Task</Button>
                            <Button size="custom" >
                                <FontAwesomeIcon icon={faClose} className="hover:text-ash duration-300 text-lg" />
                            </Button>
                        </div>
                    </form>
                ):<Button onClick={toggleCreateTaskForm} size="custom" className="bg-Neutral text-md px-4 pb-2 cursor:pointer hover:text-nurple duration-300 self-start">+ Add a task</Button>
            }
        </div>
    );
}

export default TaskColumn