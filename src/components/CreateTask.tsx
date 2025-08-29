import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type CreateTaskProps = {
    isOpen: boolean;
    className?: string;
}

function CreateTask({ className, ...props }: CreateTaskProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function toggleDisplay() {
        setIsOpen(prev => !prev);
    }

    return (
        <div className={`w-75 font-semibold rounded-md flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>
            
            {isOpen ? (
                <form className="rounded-md bg-taskBackground flex flex-col px-4 py-5">
                    <input type="text" placeholder="Enter Task name..." className="pl-3 h-10 bg-white w-full rounded-sm" />
                    <div className="flex justify-between pt-5">
                        <Button className="bg-nurple text-white hover:bg-lightNurple duration-300">Add Task</Button>
                        <Button size="custom" onClick={toggleDisplay}>
                            <FontAwesomeIcon icon={faClose} className="hover:animate-pulse text-lg" />
                        </Button>
                    </div>
                </form>
            ): <Button onClick={toggleDisplay} className="TaskHeader cursor-pointer w-75 flex flex-shrink-0 font-semibold hover:text-nurple duration-300 bg-taskBackground px-3 pb-4 rounded-md h-11 justify-start items-center"><span className='font-bold text-xl pr-2'>+</span>Create New Task</Button>}
        </div>
    );
}

export default CreateTask;