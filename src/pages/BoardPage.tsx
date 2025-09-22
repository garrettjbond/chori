import Taskbar from '../components/Taskbar';
import TaskColumn from '../components/TaskColumn';
import CreateColumn from '../components/CreateColumn';
import BoardFooterNav from '../components/BoardFooterNav.tsx';
import TaskInfoModal from '../components/TaskInfoModal';
import BoardSwitchModal from '../components/BoardSwitchModal';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useKanbanStore } from '../global/kanbanStore.ts'
import BoardOptionsModal from '../components/BoardOptionsModal.tsx';
import { useModalStore } from '../global/modalStore.ts';


const BoardPage = () => {
  const { getActiveBoard} = useKanbanStore();
  const {openModal} = useModalStore();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const activeBoard = getActiveBoard();
  if (!activeBoard) return null;


  return (
    <div className="p-10 w-full h-full xl:px-60 lg:px-30 md:px-20">
      <Navbar onSearchChange={setSearchTerm}  />
      <Taskbar onOptionsModalOpen={()=>openModal("boardOptions")} />
      <BoardOptionsModal/>
      <div className='pageContainer mt-38 flex flex-row overflow-x-auto min-h-75 gap-10'>
      {
            activeBoard.columns
              .map(column => (
                <TaskColumn onTaskOpen={()=> openModal('taskInfo')} search={searchTerm} key={column.id} column={column} title = {column.title}/>
              ))
          }
        <CreateColumn ></CreateColumn>
      </div>
      <TaskInfoModal/>
      <BoardSwitchModal/>
      <BoardFooterNav onOpen = {()=> openModal("boardSwitch")} />
    </div>
  );
};

export default BoardPage; 