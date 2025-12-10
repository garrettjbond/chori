import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import SideNav from '../components/SideNav';
import CreateBoardModal from '../components/CreateBoardModal';
import BoardOptionsModal from '../components/BoardOptionsModal';
import { useState, useEffect } from 'react';
import { useKanbanStore } from '../global/kanbanStore.ts'
import { useModalStore } from '../global/modalStore.ts';

const LandingPage = () => {
  const { boards, initializeDefaultBoard } = useKanbanStore();
  
  useEffect(() => {
    initializeDefaultBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { openModal } = useModalStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredBoards = boards.filter(board => board.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="p-10 w-full">
      <Navbar onSearchChange={setSearchTerm} />
      <CreateBoardModal />
      <BoardOptionsModal />
      <div className='pageContainer mt-24 gap-10 xl:flex xl:mx-70 lg:mx-30 md:mx-20'>
        <SideNav boards={filteredBoards} />
        <div className='xl:w-4/5'>
          {
            filteredBoards.filter(i => i.favorite).length > 0 && (
              <div>
                <div className='landingHeaderContainer flex justify-between items-end'>
                  <h2 className="text-lg lg:text-xl font-bold pl-6">FAVORITES</h2>
                </div>
                <div className='favoritesCardContainer mt-5 flex gap-4 overflow-x-auto p-2'>
                  {
                    filteredBoards
                      .filter(i => i.favorite)
                      .map(i => (
                        <Card key={i.id} isFavorite={i.favorite} title={i.title} boardId={i.id} />
                      ))
                  }
                </div>
              </div>
            )
          }
          <div className='landingHeaderContainer flex justify-between items-end pt-8'>
            <h2 className="text-lg lg:text-xl font-bold pl-6">YOUR BOARDS</h2>
            <Button className="bg-nurple text-white hover:bg-lightNurple duration-300" onClick={() => openModal('createBoard')}>Create</Button>
          </div>
          <div className="cardContainer mt-5 flex gap-4 overflow-x-auto p-2">
            {
              filteredBoards
                .filter(i => !i.favorite)
                .map(i => (
                  <Card key={i.id} isFavorite={i.favorite} title={i.title} boardId={i.id} />
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 