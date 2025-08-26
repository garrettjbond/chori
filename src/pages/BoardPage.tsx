import Navbar from '../components/Navbar';
import Taskbar from '../components/Taskbar';
import TaskColumn from '../components/TaskColumn';
import CreateColumn from '../components/CreateColumn';
import FooterNav from '../components/FooterNav';
import TaskInfoModal from '../components/TaskInfoModal';
import BoardSwitchModal from '../components/BoardSwitchModal';

const BoardPage: React.FC = () => {

  return (
    <div className="p-10 w-full h-full xl:px-70 lg:px-30 md:px-20">
      <Navbar />
      <Taskbar />
      <div className='pageContainer mt-38 flex flex-row overflow-x-auto gap-10'>
        <TaskColumn children={undefined}></TaskColumn>
        <TaskColumn children={undefined}></TaskColumn>
        <TaskColumn children={undefined}></TaskColumn>
        <TaskColumn children={undefined}></TaskColumn>
        <CreateColumn >Column</CreateColumn>
      </div>
      <TaskInfoModal isOpen={true} children={undefined}></TaskInfoModal>
      <BoardSwitchModal isOpen={true} children={undefined}></BoardSwitchModal>
      <FooterNav children={undefined}></FooterNav>
    </div>
  );
};

export default BoardPage; 