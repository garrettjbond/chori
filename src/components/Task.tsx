import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TaskProps = {
    children: React.ReactNode;
    className?: string;
}

function Task({ children, className }: TaskProps) {
    return (
        <div className={`task group flex cursor-pointer hover:text-nurple duration-300 justify-between bg-white border border-gray-300 px-3 rounded-md h-11 flex items-center ${className || ''}`}>
            <div className="flex items-center">
                <FontAwesomeIcon className='text-2xl text-darkAsh pr-2' icon={faCircleUser} />
                {children || <p>Task 1</p>}
            </div>
            <FontAwesomeIcon icon={faPenToSquare} className="opacity-0 group-hover:opacity-100 hover:animate-pulse text-lg transition-opacity duration-200" />
        </div>
    );
}

export default Task