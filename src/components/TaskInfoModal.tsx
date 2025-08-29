import { faCaretRight, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState} from 'react';
import Button from './Button';
import Comment from './Comment';

type ModalProps = {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
}

function TaskInfoModal({ children, className, ...props }: ModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isColumnCaretRotated, setIsColumnCaretRotated] = useState<boolean>(false)

    function toggleModalDisplay() {
        setIsOpen(prev => !prev);
    }

    function toggleColumnCaret() {
        setIsColumnCaretRotated(prev => !prev);
    }

    return (
        <>
            {isOpen &&
                <div className='fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-[10px] z-[1040]'>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className={`rounded-lg bg-white w-4/5 h-4/5 xl:w-3/5 2xl:w-1/2 2xl:h-2/3 flex flex-col ${className}`} {...props}>
                            <div className="headerContainer flex gap-4 border-lavender border-b-4 px-5 h-15 items-center font-semibold text-xl">
                                <h2 className='hidden sm:flex flex-shrink-0'>Task Info</h2>
                                <p className='xs:bg-red-200 text-sm bg-lavender p-1 cursor-pointer flex-shrink-0' onClick={toggleColumnCaret}>Card's Column <span><FontAwesomeIcon className={`transition-transform duration-300 ${isColumnCaretRotated ? 'rotate-90' : ''}`} icon={faCaretRight} /></span></p>
                                <div className='flex-1'></div>
                                <Button size='custom' className='hover:text-ash duration-300 flex-shrink-0' onClick={toggleModalDisplay}><FontAwesomeIcon icon={faClose} /></Button>
                            </div>
                            <div className='xs:md:grid-rows-auto md:grid md:grid-cols-[3fr_2fr] h-full overflow-hidden'>
                                <div className='taskDetailsContainer border-b-1 md:border-r-2 border-lavender px-7 py-3 md:py-5 overflow-hidden'>
                                    <h3 className='flex justify-between font-semibold pb-1 cursor-pointer'>Task Details</h3>
                                  
                                    <div className='overflow-hidden'>
                                        <div className='tagContainers flex gap-2 items-center'>
                                            <Button className='tag rounded-xl flex justify-between items-center gap-2 text-xs bg-black hover:bg-ash duration-300 text-white hover:text-black'>Tag<FontAwesomeIcon icon={faClose} /></Button>
                                            <Button className='tag rounded-xl flex justify-between items-center gap-2 text-xs bg-black hover:bg-ash duration-300 text-white hover:text-black'>Tag<FontAwesomeIcon icon={faClose} /></Button>
                                            <Button className='tag rounded-xl flex justify-between items-center gap-2 text-xs bg-black hover:bg-ash duration-300 text-white hover:text-black'><FontAwesomeIcon icon={faPlus} />Tag</Button>
                                        </div>
                                        <form action="" className='flex flex-col gap-2 pt-4'>
                                            <h3 className='font-semibold'>Description</h3>
                                            <textarea name="" id="" placeholder='Add a more detailed description...' className='m-1 border border-gray-300 p-2 rounded-md'></textarea>
                                            <Button className='w-15 rounded-xl flex items-center justify-center bg-nurple ml-1 text-white hover:bg-lightNurple duration-300 cursor-pointer'>Save</Button>
                                        </form>
                                    </div>
                                </div>
                                <div className='commentsContainer flex flex-col gap-2 md:border-l-2 border-lavender px-7 pt-3 md:pt-5 min-h-0 overflow-hidden'>
                                    <h3 className='flex justify-between font-semibold cursor-pointer'>Comments and Activity</h3>
                                    
                                        <div className='flex-1 min-h-0 overflow-hidden'>
                                            <form action="" className='flex flex-col gap-2 mb-4'>
                                                <input type="text" placeholder='Write a comment...' className='border border-gray-300 m-1 p-2 pl-3 rounded-full' />
                                                <Button className='w-15 rounded-xl flex items-center justify-center ml-1 bg-nurple text-white hover:bg-lightNurple duration-300 cursor-pointer'>Save</Button>
                                            </form>
                                            <div className='flex flex-col gap-1 py-2 max-h-40 md:max-h-96 overflow-y-auto'>
                                                <Comment content='added a comment to this ticket on 9-11-2025'></Comment>
                                                <Comment content='added a comment to this ticket on 9-11-2025'></Comment>
                                                <Comment content='added a comment to this ticket on 9-11-2025'></Comment>
                                                <Comment content='added a comment to this ticket on 9-11-2025'></Comment>
                                                <Comment content='added a comment to this ticket on 9-11-2025'></Comment>
                                            </div>
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

export default TaskInfoModal;