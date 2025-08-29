import Taskbar from '../components/Taskbar';
import TaskColumn from '../components/TaskColumn';
import CreateColumn from '../components/CreateColumn';
import FooterNav from '../components/FooterNav';
import TaskInfoModal from '../components/TaskInfoModal';
import BoardSwitchModal from '../components/BoardSwitchModal';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const BoardPage: React.FC = () => {
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState<boolean>(false);
  const [isBoardSwitchModalOpen, setIsBoardSwitchModalOpen] = useState<boolean>(false);

  const toggleTaskInfoModal = () => setIsTaskInfoModalOpen(prev => !prev);
  const toggleBoardSwitchModal = () => setIsBoardSwitchModalOpen(prev => !prev);


  return (
    <div className="p-10 w-full h-full xl:px-60 lg:px-30 md:px-20">
      <Navbar />
      <Taskbar />
      <div className='pageContainer mt-38 flex flex-row overflow-x-auto gap-10'>
        <TaskColumn children={undefined}></TaskColumn>
        <TaskColumn children={undefined}></TaskColumn>
        <CreateColumn ></CreateColumn>
      </div>
      <TaskInfoModal isOpen={isTaskInfoModalOpen} children={undefined}></TaskInfoModal>
      <BoardSwitchModal isOpen={isBoardSwitchModalOpen} children={undefined}></BoardSwitchModal>
      <FooterNav children={undefined}></FooterNav>
    </div>
  );
};

export default BoardPage; 