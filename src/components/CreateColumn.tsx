import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type CreateColumnProps = {
    children: React.ReactNode;
    className?: string;
}

function CreateColumn({ children, className, ...props }: CreateColumnProps) {
    const [showForm, setShowForm] = useState<boolean>(false);

    function toggleColumnCreateForm() {
        setShowForm(prev => !prev);
    }

    return (
        <div className={`w-75 font-semibold rounded-md flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>
            
            {showForm ? (
                <form className="rounded-md bg-taskBackground border border-gray-300 flex flex-col px-4 py-5">
                    <input type="text" placeholder="Enter column name..." className="pl-3 h-10 bg-white w-full rounded-sm" />
                    <div className="flex justify-between pt-5">
                        <Button className="bg-nurple text-white hover:bg-lightNurple duration-300">Add Column</Button>
                        <Button size="custom" >
                            <FontAwesomeIcon icon={faClose} className="hover:animate-pulse text-lg" />
                        </Button>
                    </div>
                </form>
            ): <Button onClick={toggleColumnCreateForm} className="columnHeader cursor-pointer w-75 flex flex-shrink-0 font-semibold hover:text-nurple duration-300 bg-taskHeader border border-gray-300 px-3 rounded-md h-11 flex justify-between items-center">Create New Column <span className='font-bold text-xl'>+</span></Button>}
        </div>
    );
}

export default CreateColumn;