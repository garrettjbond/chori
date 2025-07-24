import Navbar from '../components/Navbar';
import Taskbar from '../components/Taskbar';
// import Modal from '../components/Modal';

const BoardPage: React.FC = () => {

  return (
    <div className="p-5 w-full">
      <Navbar />
      <Taskbar></Taskbar>
      <div className='pageContainer mt-24 md:flex md:flex-row md:mx-auto md:w-5/9 gap-10'>
        {/* <Column></Column>
        <Column></Column>
        <CreateColumn></CreateColumn>
        <CreateColumnForm></CreateColumnForm> */}
      </div>
    </div>
  );
};

export default BoardPage; 