'use client';
import { useState } from 'react';
import useTaskStore from '@/store/taskStore';
import TaskList from '@/components/TaskList';
import TaskFilters from '@/components/TaskFilters';
import AddTaskModal from '@/components/AddTaskModal';
import ProgressBar from '@/components/ProgressBar';
import CalendarBar from '@/components/CalendarBar';

const mockUser = {
  name: 'user',
  avatar: 'https://ui-avatars.com/api/?name=Nihal&background=4f46e5&color=fff',
};

const mockTasks = [
  {
    id: 1,
    title: 'Math Homework',
    subject: 'Mathematics',
    date: 'May 28, 2025',
    description: 'Solve exercises 1 to 10 from Chapter 5.',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Biology Reading',
    subject: 'Biology',
    date: 'May 28, 2025',
    description: 'Read chapter on Cell Division and summarize notes.',
    priority: 'Normal',
    completed: true,
  },
  {
    id: 3,
    title: 'English Essay Draft',
    subject: 'English',
    date: 'May 29, 2025',
    description: 'Draft the introduction for the essay on Shakespeare.',
    priority: 'Low',
    completed: false,
  },
  {
    id: 4,
    title: 'Group Project Meeting',
    subject: 'History',
    date: 'May 27, 2025',
    description: 'Zoom call at 6 PM with project team.',
    priority: 'Normal',
    completed: false,
  },
  {
    id: 5,
    title: 'Chemistry Lab Report',
    subject: 'Chemistry',
    date: 'May 30, 2025',
    description: 'Complete the lab report for Experiment 3.',
    priority: 'High',
    completed: false,
  },
];

const calendarDays = [
  { day: 'Mon', date: 26 },
  { day: 'Tue', date: 27 },
  { day: 'Wed', date: 28, current: true },
  { day: 'Thu', date: 29 },
  { day: 'Fri', date: 30 },
  { day: 'Sat', date: 31 },
  { day: 'Sun', date: 1 },
];

function filterTasks(tasks, filter) {
  const today = new Date();
  switch (filter) {
    case 'Pending':
      return tasks.filter((t) => !t.completed && !t.overdue);
    case 'Completed':
      return tasks.filter((t) => t.completed);
    case 'Overdue':
      return tasks.filter((t) => t.overdue);
    default:
      return tasks;
  }
}

export default function Home() {
  const { tasks, addTask, updateTask, removeTask, toggleComplete } = useTaskStore();
  const [filter, setFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const filteredTasks = filterTasks(tasks, filter);
  const completedCount = tasks.filter((t) => t.completed).length;

  // Mark overdue tasks (for demo, mark if date < today)
  tasks.forEach((task) => {
    if (task.date && !task.completed) {
      const due = new Date(task.date);
      task.overdue = due < new Date(new Date().toDateString());
    } else {
      task.overdue = false;
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-6 border-b bg-white">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, {mockUser.name}</h1>
            <div className="text-gray-500 text-sm">Here's what's on your plate today.</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700" onClick={() => setShowAdd(true)}>+ Add task</button>
            <img src={mockUser.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-indigo-200" />
            <span className="font-semibold text-gray-700">{mockUser.name}</span>
          </div>
        </header>
        {/* Task Filters */}
        <div className="flex gap-2 px-10 py-4 bg-white border-b">
          <TaskFilters current={filter} onChange={setFilter} />
        </div>
        {/* Progress Bar */}
        <div className="px-10 pt-4">
          <ProgressBar completed={completedCount} total={tasks.length} />
        </div>
        {/* Task List */}
        <section className="flex-1 px-10 py-6 bg-gray-50">
          <TaskList
            tasks={filteredTasks}
            onEdit={() => {}}
            onDelete={removeTask}
            onToggle={toggleComplete}
          />
        </section>
        {/* Calendar Bar */}
        <footer className="bg-white border-t px-10 py-4">
          <CalendarBar days={calendarDays} rangeLabel="May 26 - Jun 1" />
        </footer>
        <AddTaskModal
          open={showAdd}
          onClose={() => setShowAdd(false)}
          onAdd={(task) => {
            addTask({ ...task, completed: false });
          }}
        />
      </main>
    </div>
  );
}
