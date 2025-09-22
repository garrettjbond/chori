import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Button from './Button';
import Card from './Card';
import { useKanbanStore } from '../global/kanbanStore';
import { useModalStore } from '../global/modalStore';

type BoardSwitchProps = {
    className?: string;
}

const BoardSwitchModal = ({ className, ...props }: BoardSwitchProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const {boards, activeBoardId} = useKanbanStore();
    const {closeModal, modals} = useModalStore();
    const filteredBoards = boards.filter(board => board.title.toLowerCase().includes(inputValue.toLowerCase()));


    function clearInput() {
        setInputValue("");
    }

    useEffect(()=> {
        closeModal('boardSwitch')
    }, [activeBoardId])

    return (
        <>
            {modals.boardSwitch &&
                <div className='fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-[10px] z-[1040]'>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className={`rounded-lg bg-white w-4/5 h-4/5 xl:w-3/5 2xl:w-1/2 2xl:h-2/3 ${className}`} {...props}>
                            <div className="modalHeader flex justify-between border-lavender border-b-4 px-5 h-15 items-center font-semibold text-xl">
                                <h2>Board Selection</h2>
                                <Button size='custom' className='hover:text-ash duration-300' onClick={() => {closeModal('boardSwitch')}}><FontAwesomeIcon icon={faClose} /></Button>
                            </div>
                            <div className='px-5 pt-5 flex flex-col h-full'>
                                <div className='inputContainer relative flex-shrink-0 sm:mx-auto sm:w-3/4'>
                                    <input
                                        type="text"
                                        className='pl-4 border border-gray-300 w-full h-9 rounded-full'
                                        placeholder='Search your boards'
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <Button size='custom' className='absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-ash duration-300' onClick={clearInput}><FontAwesomeIcon icon={faClose} /></Button>
                                </div>
                                <div className='flex justify-center h-full'>
                                    <div className='cardContainer flex flex-col md:grid md:grid-cols-2 md:auto-rows-max gap-4 justify-start items-center overflow-y-auto mt-5 h-3/4'>
                                        {
                                            filteredBoards
                                            .filter(i => i.id != activeBoardId)
                                            .map(i => (
                                              <Card key={i.id} isFavorite={i.favorite} title={i.title} boardId={i.id} />
                                            ))
                                        }
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default BoardSwitchModal;