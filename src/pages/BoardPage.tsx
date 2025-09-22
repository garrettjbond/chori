import Taskbar from '../components/Taskbar';
import TaskColumn from '../components/TaskColumn';
import CreateColumn from '../components/CreateColumn';
import BoardFooterNav from '../components/BoardFooterNav.tsx';
import TaskInfoModal from '../components/TaskInfoModal';
import BoardSwitchModal from '../components/BoardSwitchModal';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useKanbanStore } from '../global/kanbanStore.ts'
import { useModalStore } from '../global/modalStore.ts';
import BoardOptionsModal from '../components/BoardOptionsModal.tsx';
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";


const BoardPage = () => {
  const { getActiveBoard, moveTask, moveColumn } = useKanbanStore();
  const { openModal } = useModalStore();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const activeBoard = getActiveBoard();
  if (!activeBoard) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const activeId = active.id as string;
    const overId = over.id as string;
  
    if (activeBoard.columns.some(col => col.id === activeId)) {
      const activeColumnIndex = activeBoard.columns.findIndex(col => col.id === activeId);
      const overColumnIndex = activeBoard.columns.findIndex(col => col.id === overId);
      
      if (activeColumnIndex !== -1 && overColumnIndex !== -1 && activeColumnIndex !== overColumnIndex) {
        moveColumn(activeBoard.id, activeId, overColumnIndex);
      }
    } else {
      const draggedTaskId = activeId;
      const targetColumnId = overId.replace("-drop", "");
      
      const sourceColumn = activeBoard.columns.find(column => 
        column.tasks?.some(task => task.id === draggedTaskId)
      );
      
      if (!sourceColumn) return;
      
      if (sourceColumn.id !== targetColumnId) {
        moveTask(
          activeBoard.id,
          sourceColumn.id,
          targetColumnId,
          draggedTaskId,
          0
        );
      }
    }
  };


  return (
    <div className="p-10 w-full h-full xl:px-60 lg:px-30 md:px-20">
      <Navbar onSearchChange={setSearchTerm} />
      <Taskbar onOptionsModalOpen={() => openModal("boardOptions")} />
      <BoardOptionsModal />
      <DndContext onDragEnd={handleDragEnd} >
        <div className='pageContainer mt-38 flex gap-10'>
          <div className='flex flex-row overflow-x-auto min-h-75 gap-10'>
          {
            activeBoard.columns
            .map(column => (
              <TaskColumn onTaskOpen={() => openModal('taskInfo')} search={searchTerm} key={column.id} column={column} title={column.title} />
            ))
          }
          </div>
          <CreateColumn ></CreateColumn>
        </div>
      </DndContext>
      <TaskInfoModal />
      <BoardSwitchModal />
      <BoardFooterNav onOpen={() => openModal("boardSwitch")} />
    </div>
  );
};

export default BoardPage; 