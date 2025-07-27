
import Navbar from '../components/Navbar';
import Taskbar from '../components/Taskbar';
import TaskColumn from '../components/TaskColumn';
import CreateColumn from '../components/CreateColumn';
import FooterNav from '../components/FooterNav';
// import Modal from '../components/Modal';

const BoardPage: React.FC = () => {

  return (
    <div className="p-5 w-full">
      <Navbar />
      <Taskbar />
      <div className='pageContainer mt-38 flex flex-row overflow-x-auto gap-10'>
        <TaskColumn children={undefined}></TaskColumn>
        <TaskColumn children={undefined}></TaskColumn>
        <TaskColumn children={undefined}></TaskColumn>
        <TaskColumn children={undefined}></TaskColumn>
        <CreateColumn children={undefined}></CreateColumn>
      </div>
      {/* <Modal isOpen={false} modalMessage={'Hello World'} children={undefined}></Modal> */}
      <FooterNav children={undefined}></FooterNav>
    </div>
  );
};

export default BoardPage; 