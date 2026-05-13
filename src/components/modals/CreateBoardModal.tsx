import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useKanbanStore } from '../../store/kanbanStore';
import { useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import Button from '../shared/Button';

type CreateBoardProps = {
    className?: string;
}

const CreateBoardModal = ({ className, ...props }: CreateBoardProps) => {
    const [textInput, setTextInput] = useState<string>("");
    const { closeModal, modals } = useModalStore();
    const { createBoard } = useKanbanStore();

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
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-board-title"
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[10px] z-[1040]"
                >
                    <div className={`rounded-lg bg-white w-4/5 max-w-75 h-fit flex flex-col ${className}`} {...props}>
                        <header className="headerContainer flex gap-4 border-lavender border-b-4 px-5 h-15 justify-between items-center font-semibold text-xl">
                            <h2 id='create-board-title'>Create Board</h2>
                            <Button aria-label="Close Board Creation modal" size='custom' className='hover:text-ash duration-300 flex-shrink-0' onClick={() => closeModal('createBoard')}><FontAwesomeIcon icon={faClose} aria-hidden="true" /></Button>
                        </header>
                        <form onSubmit={handleSubmit} className="rounded-md flex flex-col px-6 py-5">
                            <label htmlFor="create-board-name" className='sr-only'>Board name</label>
                            <input autoFocus required id='create-board-name' maxLength={25} onChange={handleChange} value={textInput} type="text" placeholder="Enter Board name..." className="pl-3 h-10 bg-white border border-gray-300 w-full rounded-sm" />
                            <div className="flex justify-between pt-5">
                                <Button type='submit' className="bg-nurple text-white hover:bg-lightNurple duration-300" >Add Board</Button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default CreateBoardModal;