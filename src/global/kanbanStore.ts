import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ----- Types -----
export type Tag = {
  id: string;
  title: string;
  color: string;
  createdBy?: string;
};

export type Comment = {
  id: string;
  createdBy: string;
  createdDate: string;
  description: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  tags?: Tag[];
  comments?: Comment[];
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Board = {
  id: string;
  title: string;
  favorite: boolean;
  columns: Column[];
};

export type KanbanState = {
  activeBoardId: string | null;
  setActiveBoardId: (boardId: string | null) => void;
  getActiveBoard: () => Board | null;
  boards: Board[];
  createBoard: (title: string) => void;
  renameBoard: (boardId: string, newTitle: string) => void;
  toggleFavoriteBoard: (boardId: string) => void;
  deleteBoard: (boardId: string) => void;

  activeColumnId: string | null;
  setActiveColumnId: (columnId: string | null) => void;
  getActiveColumn: () => Column | null;
  createColumn: (boardId: string, title: string) => void;
  renameColumn: (boardId: string, columnId: string, newTitle: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  moveColumn: (boardId: string, columnId: string, targetIndex: number) => void;

  activeTaskId: string | null;
  setActiveTaskId: (taskId: string | null) => void;
  getActiveTask: () => Task | null;
  createTask: (columnId: string, title: string) => void;
  updateTask: (columnId: string, taskId: string, updates: Partial<Task>) => void;
  renameTask: (columnId: string, taskId: string, newTitle: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  deleteAllTasks: (columnId: string) => void;
  moveTask: (
    boardId: string,
    sourceColumnId: string,
    targetColumnId: string,
    taskId: string,
    targetIndex?: number
  ) => void;

  activeCommentId: string | null;
  setActiveCommentId: (commentId: string | null) => void;
  getActiveComment: () => Comment | null;
  createComment: (taskId: string, description: string) => void;
  deleteComment: (commentId: string, taskId: string) => void;

  activeTagId: string | null;
  getActiveTag: () => Tag | null;
  createTag: (taskId: string, title: string, color: string) => void;
  deleteTag: (tagId: string, taskId: string) => void;
};

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      // --- Boards ---
      activeBoardId: null,
      setActiveBoardId: (boardId: string | null) => {
        if (!boardId) {
          set({ activeBoardId: null, activeColumnId: null, activeTaskId: null });
          return;
        }
        const state = get();
        if (state.boards.some((b) => b.id === boardId)) {
          set({ activeBoardId: boardId, activeColumnId: null, activeTaskId: null });
        }
      },
      getActiveBoard: () => {
        const state = get();
        return state.boards.find((b) => b.id === state.activeBoardId) || null;
      },
      boards: [],
      createBoard: (title: string) =>
        set((state) => {
          const newBoard: Board = { id: crypto.randomUUID(), title, favorite: false, columns: [] };
          return { boards: [...state.boards, newBoard], activeBoardId: newBoard.id };
        }),
      renameBoard: (boardId: string, newTitle: string) =>
        set((state) => ({
          boards: state.boards.map((b) => (b.id === boardId ? { ...b, title: newTitle } : b)),
        })),
      toggleFavoriteBoard: (boardId: string) =>
        set((state) => ({
          boards: state.boards.map((b) => (b.id === boardId ? { ...b, favorite: !b.favorite } : b)),
        })),
      deleteBoard: (boardId: string) =>
        set((state) => ({ boards: state.boards.filter((b) => b.id !== boardId) })),

      // --- Columns ---
      activeColumnId: null,
      setActiveColumnId: (columnId: string | null) => {
        const state = get();
        if (!columnId) {
          set({ activeColumnId: null, activeTaskId: null });
          return;
        }
        const activeBoard = state.getActiveBoard();
        if (activeBoard?.columns.some((c) => c.id === columnId)) {
          set({ activeColumnId: columnId, activeTaskId: null });
        }
      },
      getActiveColumn: () => {
        const state = get();
        const activeBoard = state.getActiveBoard();
        if (!activeBoard) return null;
        return activeBoard.columns.find((c) => c.id === state.activeColumnId) || null;
      },
      createColumn: (boardId: string, title: string) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId
              ? { ...b, columns: [...b.columns, { id: crypto.randomUUID(), title, tasks: [] }] }
              : b
          ),
        })),
      renameColumn: (boardId, columnId, newTitle) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId
              ? {
                  ...b,
                  columns: b.columns.map((c) =>
                    c.id === columnId ? { ...c, title: newTitle } : c
                  ),
                }
              : b
          ),
        })),
      deleteColumn: (boardId, columnId) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId
              ? { ...b, columns: b.columns.filter((c) => c.id !== columnId) }
              : b
          ),
        })),
      moveColumn: (boardId, columnId, targetIndex) =>
        set((state) => ({
          boards: state.boards.map((b) => {
            if (b.id !== boardId) return b;
            const columns = [...b.columns];
            const idx = columns.findIndex((c) => c.id === columnId);
            if (idx === -1) return b;
            const [col] = columns.splice(idx, 1);
            columns.splice(targetIndex, 0, col);
            return { ...b, columns };
          }),
        })),

      // --- Tasks ---
      activeTaskId: null,
      setActiveTaskId: (taskId: string | null) => {
        const state = get();
        if (!taskId) {
          set({ activeTaskId: null });
          return;
        }
        const activeColumn = state.getActiveColumn();
        if (activeColumn?.tasks.some((t) => t.id === taskId)) set({ activeTaskId: taskId });
      },
      getActiveTask: () => {
        const state = get();
        const column = state.getActiveColumn();
        if (!column) return null;
        return column.tasks.find((t) => t.id === state.activeTaskId) || null;
      },
      createTask: (columnId, title) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) =>
              c.id === columnId ? { ...c, tasks: [...c.tasks, { id: crypto.randomUUID(), title }] } : c
            ),
          })),
        })),
      updateTask: (columnId, taskId, updates) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) =>
              c.id === columnId
                ? {
                    ...c,
                    tasks: c.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
                  }
                : c
            ),
          })),
        })),
      renameTask: (columnId, taskId, newTitle) =>
        get().updateTask(columnId, taskId, { title: newTitle }),
      deleteTask: (columnId, taskId) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) =>
              c.id === columnId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c
            ),
          })),
        })),
      deleteAllTasks: (columnId) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) =>
              c.id === columnId ? { ...c, tasks: [] } : c
            ),
          })),
        })),
      moveTask: (boardId, sourceColumnId, targetColumnId, taskId, targetIndex) =>
        set((state) => ({
          boards: state.boards.map((b) => {
            if (b.id !== boardId) return b;
            const source = b.columns.find((c) => c.id === sourceColumnId);
            const target = b.columns.find((c) => c.id === targetColumnId);
            if (!source || !target) return b;
            const task = source.tasks.find((t) => t.id === taskId);
            if (!task) return b;

            // Remove from source
            const newSourceTasks = source.tasks.filter((t) => t.id !== taskId);
            const newTargetTasks = [...target.tasks];
            const idx = targetIndex ?? newTargetTasks.length;
            newTargetTasks.splice(idx, 0, task);

            return {
              ...b,
              columns: b.columns.map((c) => {
                if (c.id === sourceColumnId) return { ...c, tasks: newSourceTasks };
                if (c.id === targetColumnId) return { ...c, tasks: newTargetTasks };
                return c;
              }),
            };
          }),
        })),

      // --- Comments ---
      activeCommentId: null,
      setActiveCommentId: (commentId: string | null) => set({ activeCommentId: commentId }),
      getActiveComment: () => {
        const column = get().getActiveColumn();
        const task = get().getActiveTask();
        if (!task) return null;
        return task.comments?.find((c) => c.id === get().activeCommentId) || null;
      },
      createComment: (taskId, description) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) => ({
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId
                  ? {
                      ...t,
                      comments: [
                        ...(t.comments || []),
                        {
                          id: crypto.randomUUID(),
                          createdBy: 'Current User',
                          createdDate: new Date().toLocaleDateString(),
                          description,
                        },
                      ],
                    }
                  : t
              ),
            })),
          })),
        })),
      deleteComment: (commentId, taskId) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) => ({
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId
                  ? { ...t, comments: (t.comments || []).filter((c) => c.id !== commentId) }
                  : t
              ),
            })),
          })),
        })),

      // --- Tags ---
      activeTagId: null,
      getActiveTag: () => {
        const task = get().getActiveTask();
        if (!task) return null;
        return task.tags?.find((t) => t.id === get().activeTagId) || null;
      },
      createTag: (taskId, title, color) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) => ({
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId
                  ? {
                      ...t,
                      tags: [...(t.tags || []), { id: crypto.randomUUID(), title, color, createdBy: 'Current User' }],
                    }
                  : t
              ),
            })),
          })),
        })),
      deleteTag: (tagId, taskId) =>
        set((state) => ({
          boards: state.boards.map((b) => ({
            ...b,
            columns: b.columns.map((c) => ({
              ...c,
              tasks: c.tasks.map((t) =>
                t.id === taskId ? { ...t, tags: (t.tags || []).filter((tag) => tag.id !== tagId) } : t
              ),
            })),
          })),
        })),
    }),
    {
      name: 'kanban-storage',
      partialize: (state) => ({
        boards: state.boards,
        activeBoardId: state.activeBoardId,
        activeColumnId: state.activeColumnId,
        activeTaskId: state.activeTaskId,
      }),
    }
  )
);
