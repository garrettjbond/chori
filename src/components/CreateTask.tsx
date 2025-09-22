import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useKanbanStore } from "../global/kanbanStore";
import { useModalStore } from "../global/modalStore";

type CreateTaskProps = {
    isOpen: boolean;
    className?: string;
    colId: string;
}

const CreateTask = ({ isOpen, colId, className, ...props }: CreateTaskProps) => {
    const [textInput, setTextInput] = useState<string>("");
    const {closeModal, openModal} = useModalStore();
    const { createTask, setActiveColumnId, activeColumnId } = useKanbanStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, colId: string) => {
        e.preventDefault();
        if (activeColumnId) {
            createTask(activeColumnId, textInput.trim());
            setTextInput("");
            closeModal('createTask');
        }
    }

    function openDisplay(colId: string) {
        setActiveColumnId(colId)
        openModal('createTask');
    }

    return (
        <div className={`w-75 font-semibold rounded-md flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>

            {isOpen ? (
                <form
                    onSubmit={(e) => handleSubmit(e, colId)}
                    className="rounded-md bg-taskBackground flex flex-col px-4 py-5"
                >
                    <input
                        required
                        maxLength={15}
                        onChange={handleChange}
                        value={textInput}
                        type="text"
                        placeholder="Enter Task name..."
                        className="pl-3 h-10 bg-white w-full rounded-sm"
                    />
                    <div className="flex justify-between pt-5">
                        <Button
                            type="submit"
                            className="bg-nurple text-white hover:bg-lightNurple duration-300"
                        >
                            Add Task
                        </Button>
                        <Button
                            size="custom"
                            onClick={() => closeModal('createTask')}
                            type="button"
                        >
                            <FontAwesomeIcon icon={faClose} className="hover:animate-pulse text-lg" />
                        </Button>
                    </div>
                </form>
            ) : <Button onClick={() => openDisplay(colId)} className="TaskHeader cursor-pointer w-75 flex flex-shrink-0 font-semibold hover:text-nurple duration-300 bg-taskBackground px-3 pb-4 rounded-md h-11 justify-start items-center"><span className='font-bold text-xl pr-2'>+</span>Create New Task</Button>}
        </div>
    );
}

export default CreateTask;