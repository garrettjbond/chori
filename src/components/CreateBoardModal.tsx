import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import { useKanbanStore } from '../global/kanbanStore';
import { useState } from 'react';
import { useModalStore } from '../global/modalStore';

type CreateBoardProps = {
    className?: string;
}

const CreateBoardModal = ({className, ...props }: CreateBoardProps) => {
    const [textInput, setTextInput] = useState<string>("");
    const {closeModal, modals} = useModalStore();
    const {createBoard} = useKanbanStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (textInput.trim()) {
            createBoard(textInput.trim());
            setTextInput("");
            closeModal('createBoard');
        }
    }

    return (
        <>
            {modals.createBoard &&
                <div className='fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-[10px] z-[1040]'>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className={`rounded-lg bg-white w-4/5 max-w-75 h-fit flex flex-col ${className}`} {...props}>
                            <div className="headerContainer flex gap-4 border-lavender border-b-4 px-5 h-15 justify-between items-center font-semibold text-xl">
                                <h2>Board Creation</h2>
                                <Button size='custom' className='hover:text-ash duration-300 flex-shrink-0' onClick={() => closeModal('createBoard')}><FontAwesomeIcon icon={faClose} /></Button>
                            </div>
                            <div>
                                <form onSubmit={handleSubmit} className="rounded-md flex flex-col px-6 py-5">
                                    <input required maxLength={25} onChange={handleChange} value={textInput} type="text" placeholder="Enter Board name..." className="pl-3 h-10 bg-white border border-gray-300 w-full rounded-sm" />
                                    <div className="flex justify-between pt-5">
                                        <Button type='submit' className="bg-nurple text-white hover:bg-lightNurple duration-300" >Add Board</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default CreateBoardModal;