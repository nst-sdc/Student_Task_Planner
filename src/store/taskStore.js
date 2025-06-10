import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(persist(
  (set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, { ...task, id: Date.now() }] })),
    removeTask: (taskId) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
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
  }),
  {
    name: 'task-storage', // name of item in storage
  }
));

export default useTaskStore; 