import { faEllipsis} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import Task from "./Task";

type TaskColumnProps = {
    children: React.ReactNode;
    className?: string;
}

function TaskColumn({ children, className, ...props }: TaskColumnProps) {
    return (
        <div className={`w-75 font-semibold rounded-md mb-5 bg-taskBackground flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>
            <div className="columnHeader cursor-pointer hover:text-nurple duration-300 bg-taskHeader border border-gray-300 px-3 rounded-md h-11 flex justify-between items-center">
                <h2 contentEditable>Column Title</h2>
                <FontAwesomeIcon icon={faEllipsis} className="hover:animate-pulse text-lg" />
            </div>
            <Task children={undefined}></Task>
            <Task children={undefined}></Task>
            <Task children={undefined}></Task>
            <Task children={undefined}></Task>
            <Button size="custom" className="bg-Neutral text-md px-4 pb-2 cursor:pointer hover:text-ash duration-300 self-start">+ Add a card</Button>
        </div>
    );
}

export default TaskColumn