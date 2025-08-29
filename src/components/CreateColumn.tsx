import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type CreateColumnProps = {
    className?: string;
}

function CreateColumn({ className, ...props }: CreateColumnProps) {
    const [showForm, setShowForm] = useState<boolean>(false);

    function toggleCreateColumnForm() {
        setShowForm(prev => !prev);
    }

    return (
        <div className={`w-75 font-semibold rounded-md flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>
            
            {showForm ? (
                <form className="rounded-md bg-taskBackground border border-gray-300 flex flex-col px-4 py-5">
                    <input type="text" placeholder="Enter column name..." className="pl-3 h-10 bg-white w-full rounded-sm" />
                    <div className="flex justify-between pt-5">
                        <Button className="bg-nurple text-white hover:bg-lightNurple duration-300">Add Column</Button>
                        <Button size="custom" onClick={toggleCreateColumnForm} >
                            <FontAwesomeIcon icon={faClose} className="hover:animate-pulse text-lg" />
                        </Button>
                    </div>
                </form>
            ): <Button onClick={toggleCreateColumnForm} className="columnHeader cursor-pointer w-75 flex flex-shrink-0 font-semibold hover:text-nurple duration-300 bg-taskHeader px-3 rounded-md h-11 justify-start items-center"><span className='font-bold text-xl pr-2'>+</span>Create New Column</Button>}
        </div>
    );
}

export default CreateColumn;