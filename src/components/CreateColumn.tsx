import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useKanbanStore } from "../global/kanbanStore";
import { useModalStore } from "../global/modalStore";

type CreateColumnProps = {
    className?: string;
}

const CreateColumn = ({ className, ...props }: CreateColumnProps) => {
    const { activeBoardId, createColumn } = useKanbanStore();
    const {toggleModal, modals} = useModalStore();

    const [textInput, setTextInput] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (textInput.trim() && typeof activeBoardId === "string") {
            createColumn(activeBoardId, textInput.trim());
            setTextInput("");
            toggleModal('createColumn');
        }}

        return (
            <div className={`w-75 font-semibold rounded-md flex flex-shrink-0 flex-col gap-2 ${className}`} {...props}>

                {modals.createColumn ? (
                    <form onSubmit={handleSubmit} className="rounded-md bg-taskBackground border border-gray-300 flex flex-col px-4 py-5">
                        <input required maxLength={15} onChange={handleChange} value={textInput} type="text" placeholder="Enter column name..." className="pl-3 h-10 bg-white w-full rounded-sm" />
                        <div className="flex justify-between pt-5">
                            <Button type="submit" className="bg-nurple text-white hover:bg-lightNurple duration-300">Add Column</Button>
                            <Button size="custom" onClick={()=> toggleModal('createColumn')} >
                                <FontAwesomeIcon icon={faClose} className="hover:animate-pulse text-lg" />
                            </Button>
                        </div>
                    </form>
                ) : <Button onClick={()=>toggleModal('createColumn')} className="columnHeader cursor-pointer w-75 flex flex-shrink-0 font-semibold hover:text-nurple duration-300 bg-gradient-to-r from-taskBackground to-lavender hover:from-gray-200 hover:to-purple-200 px-3 rounded-md h-11 justify-start items-center border-0"><span className='font-bold text-xl pr-2'>+</span>Create New Column</Button>}
            </div>
        );
}

export default CreateColumn;