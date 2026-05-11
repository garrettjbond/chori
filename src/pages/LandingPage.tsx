import Navbar from '../components/shared/Navbar.tsx';
import Button from '../components/shared/Button.tsx';
import Card from '../components/landing/Card.tsx';
import SideNav from '../components/landing/SideNav';
import CreateBoardModal from '../components/modals/CreateBoardModal';
import BoardOptionsModal from '../components/modals/BoardOptionsModal';
import { useState, useEffect } from 'react';
import { useKanbanStore } from '../store/kanbanStore.ts';
import { useModalStore } from '../store/modalStore.ts';

const LandingPage = () => {
  const { boards, initializeDefaultBoard } = useKanbanStore();
  const { openModal } = useModalStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredBoards = boards.filter(board => board.title.toLowerCase().includes(searchTerm.toLowerCase()));
  useEffect(() => {
    initializeDefaultBoard();
  }, []);

  return (
    <main className="p-10 w-full">
      <Navbar onSearchChange={setSearchTerm} />
      <CreateBoardModal />
      <BoardOptionsModal />
      <div className='pageContainer mt-24 gap-10 xl:flex xl:mx-70 lg:mx-30 md:mx-20'>
        <aside aria-label='Board navigation'>
          <SideNav boards={filteredBoards} />
        </aside>
        <div className='xl:w-4/5'>
          {
            filteredBoards.filter(i => i.favorite).length > 0 && (
              <section aria-labelledby="favorites-heading">
                <div className='landingHeaderContainer flex justify-between items-end'>
                  <h2 id="favorites-heading" className="text-lg lg:text-xl font-bold pl-6 uppercase">Favorites</h2>
                </div>
                <ul className='favoritesCardContainer mt-5 flex gap-4 overflow-x-auto p-2'>
                  {
                    filteredBoards
                      .filter(i => i.favorite)
                      .map(i => (
                        <li key={i.id}>
                          <Card isFavorite={i.favorite} title={i.title} boardId={i.id} />
                        </li>
                      ))
                  }
                </ul>
              </section>
            )
          }
          <section aria-labelledby="boards-heading">
            <div className='landingHeaderContainer flex justify-between items-end pt-8'>
              <h2 id="boards-heading" className="text-lg lg:text-xl font-bold pl-6 uppercase">Your Boards</h2>
              <Button className="bg-nurple text-white hover:bg-lightNurple duration-300" onClick={() => openModal('createBoard')}>Create</Button>
            </div>
            <ul className="cardContainer mt-5 flex gap-4 overflow-x-auto p-2">
              {
                filteredBoards
                  .filter(i => !i.favorite)
                  .map(i => (
                    <li key={i.id}>
                      <Card isFavorite={i.favorite} title={i.title} boardId={i.id} />
                    </li>
                  ))
              }
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LandingPage; 