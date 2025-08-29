import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import SideNav from '../components/SideNav';
import CreateBoardModal from '../components/CreateBoardModal';
import { useState } from 'react';

const LandingPage: React.FC = () => {
  const [isBoardCreationModalOpen, setIsBoardCreationModalOpen] = useState<boolean>(false);

  const toggleTaskInfoModal = () => setIsBoardCreationModalOpen(prev => !prev);


  return (
    <div className="p-10 w-full">
      <Navbar />
      <CreateBoardModal isOpen={isBoardCreationModalOpen}></CreateBoardModal>
      <div className='pageContainer mt-24 gap-10 xl:flex xl:mx-70 lg:mx-30 md:mx-20'>
        <SideNav></SideNav>
        <div className='xl:w-4/5'>
          <div className='landingHeaderContainer flex justify-between items-end'>
            <h2 className="text-lg lg:text-xl font-bold pl-6">FAVORITES</h2>
          </div>
          <div className='favoritesCardContainer mt-5 flex gap-4 overflow-x-auto p-2'>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className='landingHeaderContainer flex justify-between items-end pt-8'>
            <h2 className="text-lg lg:text-xl font-bold pl-6">YOUR BOARDS</h2>
            <Button className="bg-nurple text-white hover:bg-lightNurple duration-300" onClick={() => setIsBoardCreationModalOpen(true)}>Create</Button>
          </div>
          <div className="cardContainer mt-5 flex gap-4 overflow-x-auto p-2">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 