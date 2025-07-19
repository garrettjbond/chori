import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Modal from '../components/Modal';

const BoardPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();

  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Board: {boardId}</h1>
      <p>This is where the board's tasks will appear.</p>
      <div className="mt-6">
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">Back to Boards</Link>
        {/* <Modal isOpen={true} modalMessage={''} children={undefined}></Modal> */}
      </div>
    </div>
  );
};

export default BoardPage; 