import { faCaretRight, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Button from './Button';
import Comment from './Comment';
import { useKanbanStore } from '../global/kanbanStore';
import { useModalStore } from '../global/modalStore';
import Tag from './Tag';

type TaskInfoModalProps = {
    className?: string;
}

const TaskInfoModal = ({ className, ...props }: TaskInfoModalProps) => {
    const [isColumnCaretRotated, setIsColumnCaretRotated] = useState<boolean>(false);
    const [isNewTag, setIsNewTag] = useState<boolean>(false);
    const [isDescriptionEditable, setIsDescriptionEditable] = useState<boolean>(false);
    const { getActiveTask, activeTaskId, createComment, getActiveBoard, getActiveColumn, moveTask, createTag, updateTask } = useKanbanStore();
    const { modals, closeModal } = useModalStore();
    const activeTask = getActiveTask();
    const [newDescription, setNewDescription] = useState<string>(activeTask?.description ?? "");
    const activeBoard = getActiveBoard();
    const activeColumn = getActiveColumn();
    const [textCommentInput, setTextCommentInput] = useState<string>("");
    const [textTagInput, setTextTagInput] = useState<string>("");
    const [colorTagInput, setColorTagInput] = useState<string>("#000000");
    useEffect(() => {
        console.log('isDescriptionEditable changed:', isDescriptionEditable);
    }, [isDescriptionEditable]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextCommentInput(e.target.value)
    }

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (textCommentInput.trim() && typeof activeTaskId === "string") {
            createComment(activeTaskId, textCommentInput.trim());
            setTextCommentInput("");
        }
    }
    const handleTagTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextTagInput(e.target.value)
    }
    const handleTagColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColorTagInput(e.target.value)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(e.target.value)
    }

    const handleDescriptionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (activeTask && activeColumn?.id) {
            updateTask(activeColumn.id, activeTask.id, { description: newDescription });
        }
        setIsDescriptionEditable(false);
    }

    const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (textTagInput.trim() && typeof activeTaskId === "string") {
            createTag(activeTaskId, textTagInput.trim(), colorTagInput);
            setTextTagInput("");
            setIsNewTag(prev => !prev)
        }
    }

    function toggleColumnCaret() {
        setIsColumnCaretRotated(prev => !prev);
    }

    return (
        <>
            {modals.taskInfo &&
                <div className='fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-[10px] z-[1040]'>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className={`rounded-lg bg-white w-4/5 h-4/5 xl:w-3/5 2xl:w-1/2 2xl:h-2/3 flex flex-col ${className}`} {...props}>
                            <div className="headerContainer flex gap-4 border-lavender border-b-4 px-5 h-15 items-center font-semibold text-xl">
                                <h2 className='hidden sm:flex flex-shrink-0'>{activeTask?.title}</h2>
                                <p className='xs:bg-red-200 text-sm bg-lavender rounded-lg p-1 cursor-pointer flex-shrink-0' onClick={toggleColumnCaret}>{activeColumn?.title}<span><FontAwesomeIcon className={`transition-transform duration-300 ${isColumnCaretRotated ? 'rotate-90' : ''}`} icon={faCaretRight} /></span></p>
                                <div className='relative'>
                                    {isColumnCaretRotated && (
                                        <div className="absolute top-full -right-18 mt-4 bg-white border border-gray-300 rounded-md shadow-lg p-3 min-w-50 z-10">
                                            <ul className="flex flex-col gap-2">
                                                {
                                                    activeBoard?.columns
                                                        .filter((x) => x.id !== activeColumn?.id)
                                                        .map((col) => {
                                                            if (
                                                                typeof activeBoard?.id === "string" &&
                                                                typeof activeColumn?.id === "string" &&
                                                                typeof col.id === "string" &&
                                                                typeof activeTask?.id === "string"
                                                            ) {
                                                                return (
                                                                    <li
                                                                        key={col.id}
                                                                        onClick={() => {
                                                                            moveTask(
                                                                                activeBoard.id,
                                                                                activeColumn.id,
                                                                                col.id,
                                                                                activeTask.id
                                                                            );
                                                                            toggleColumnCaret();
                                                                            closeModal('taskInfo');
                                                                        }
                                                                        }
                                                                        className="flex items-center justify-center text-gray-500 p-2 hover:bg-lavender hover:text-gray-800 rounded cursor-pointer"
                                                                    >
                                                                        {col.title}
                                                                    </li>
                                                                );
                                                            }
                                                            return null;
                                                        })
                                                }
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className='flex-1'></div>
                                <Button size='custom' className='hover:text-ash duration-300 flex-shrink-0' onClick={() => { setIsDescriptionEditable(false); closeModal('taskInfo'); setIsColumnCaretRotated(false); setIsNewTag(false) }}><FontAwesomeIcon icon={faClose} /></Button>
                            </div>
                            {/* grid wrapper */}
                            <div className='xs:md:grid-rows-auto md:grid md:grid-cols-[3fr_2fr] h-full md:overflow-hidden'>
                                {/* task details */}
                                <div className='taskDetailsContainer border-b-1 md:border-r-2 border-lavender px-7 py-3 md:py-5 overflow-visible md:overflow-hidden'>
                                    <h3 className='flex justify-between font-semibold pb-1 cursor-pointer'>Task Details</h3>
                                    <div className='relative'>
                                        <div className='tagContainers relative flex flex-wrap gap-2 items-center'>
                                            {activeTask?.tags?.map((tag) => (
                                                <Tag id={tag.id} color={tag.color} activeTaskId={activeTask.id} title={tag.title}></Tag>
                                            ))}
                                            <Button onClick={() => setIsNewTag(prev => !prev)} size='custom' className='tag w-7 h-7 rounded-xl text-center gap-2 text-xs bg-black hover:bg-ash duration-300 text-white hover:text-black'>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                            {isNewTag && (
                                                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 min-w-64 max-w-sm z-[60]">
                                                    <div className='flex justify-between items-center mb-3'>
                                                        <div></div>
                                                        <h3 className='text-center font-semibold'>Tag Creation</h3>
                                                        <FontAwesomeIcon icon={faClose} onClick={() => setIsNewTag(false)} className="cursor-pointer hover:text-darkAsh"></FontAwesomeIcon>
                                                    </div>
                                                    <hr className='mb-5 text-lavender' />
                                                    <form onSubmit={handleTagSubmit} className='flex flex-col gap-5'>
                                                        <div className='flex gap-2 items-center'>
                                                            <label>Title: </label>
                                                            <input maxLength={20} required value={textTagInput} onChange={handleTagTextChange} type="text" placeholder='tag title' className='pl-3 h-10 bg-white border border-gray-300 w-full rounded-sm' />
                                                        </div>
                                                        <div className='flex gap-2 items-center'>
                                                            <label>Color: </label>
                                                            <input value={colorTagInput} onChange={handleTagColorChange} type="color" />
                                                        </div>
                                                        <Button type='submit' className='bg-nurple text-white hover:bg-lightNurple duration-300 cursor-pointer'>Save</Button>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-2 pt-4'>
                                            <h3 className='font-semibold'>Description</h3>
                                            {isDescriptionEditable ? (
                                                <form onSubmit={handleDescriptionSubmit} className="flex flex-col gap-2">
                                                    <textarea
                                                        onChange={handleDescriptionChange}
                                                        value={newDescription}
                                                        placeholder="Add a more detailed description..."
                                                        className="m-1 border border-gray-300 p-2 rounded-md resize-none"
                                                    />
                                                    <Button
                                                        type="submit"
                                                        className="w-15 rounded-xl flex items-center justify-center bg-nurple ml-1 text-white hover:bg-lightNurple duration-300 cursor-pointer"
                                                    >
                                                        Save
                                                    </Button>
                                                </form>
                                            ) : (
                                                <div className="m-1">
                                                    {activeTask?.description && activeTask.description.trim() !== "" ? (
                                                        <>
                                                            <p className="p-2 border border-gray-100 rounded-md bg-gray-50 
               max-h-40 overflow-y-auto">
                                                                {activeTask.description}
                                                            </p>
                                                            <Button
                                                                type="button"
                                                                onClick={() => {
                                                                    setIsDescriptionEditable(true);
                                                                    setNewDescription(activeTask?.description ?? "");
                                                                }}
                                                                className="underline m-2"
                                                                size="custom"
                                                            >
                                                                Edit
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-col items-start gap-2">
                                                            <p className="italic text-gray-400">No description added yet.</p>
                                                            <Button
                                                                type="button"
                                                                onClick={() => {
                                                                    setIsDescriptionEditable(true);
                                                                    setNewDescription("");
                                                                }}
                                                                className="underline text-sm ml-1"
                                                                size="custom"
                                                            >
                                                                Add description
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* comments */}
                                <div className='commentsContainer flex flex-col gap-2 md:border-l-2 border-lavender px-7 pt-3 md:pt-5 min-h-0 md:overflow-hidden'>
                                    <h3 className='flex justify-between font-semibold cursor-pointer'>Comments and Activity</h3>
                                    <div className='flex-1 min-h-0 overflow-hidden'>
                                        <form onSubmit={handleCommentSubmit} action="" className='flex flex-col gap-2 mb-4'>
                                            <input required onChange={handleCommentChange} value={textCommentInput} type="text" placeholder='Write a comment...' className='border border-gray-300 m-1 p-2 pl-3 rounded-full' />
                                            <Button type='submit' className='w-15 rounded-xl flex items-center justify-center ml-1 bg-nurple text-white hover:bg-lightNurple duration-300 cursor-pointer'>Save</Button>
                                        </form>
                                        <div className='flex flex-col gap-1 py-2 max-h-40 md:max-h-96 overflow-y-auto'>
                                            {activeTask?.comments?.map((comment, idx: number) => (
                                                <Comment commentId={comment.id} key={idx} content={comment.description} author={comment.createdBy} date={comment.createdDate} />
                                            ))}
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
