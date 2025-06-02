import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      bin: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, { ...task, id: Date.now() }] })),
      removeTask: (taskId) => set((state) => {
        const taskToRemove = state.tasks.find((task) => task.id === taskId);
        return {
          tasks: state.tasks.filter((task) => task.id !== taskId),
          bin: taskToRemove ? [...state.bin, { ...taskToRemove, deletedAt: new Date().toISOString() }] : state.bin,
        };
      }),
      updateTask: (taskId, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)),
        })),
      toggleComplete: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        })),
      restoreTask: (taskId) => set((state) => {
        const taskToRestore = state.bin.find((task) => task.id === taskId);
        return {
          bin: state.bin.filter((task) => task.id !== taskId),
          tasks: taskToRestore ? [...state.tasks, { ...taskToRestore, deletedAt: undefined }] : state.tasks,
        };
      }),
      permanentlyDeleteTask: (taskId) =>
        set((state) => ({
          bin: state.bin.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);

export default useTaskStore; 