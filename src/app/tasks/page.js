'use client';
import { useState } from 'react';
import useTaskStore from '@/store/taskStore';
import AddTaskModal from '@/components/AddTaskModal';
import { format, isToday, isThisWeek, isPast, parseISO } from 'date-fns';

const TABS = ['All Tasks', 'Today', 'This Week', 'Overdue', 'Completed'];

function getISTToday() {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return format(ist, 'yyyy-MM-dd');
}

function filterTasks(tasks, tab) {
  const today = getISTToday();
  switch (tab) {
    case 'Today':
      return tasks.filter((t) => t.date === today);
    case 'This Week':
      return tasks.filter((t) => isThisWeek(parseISO(t.date), { weekStartsOn: 1 }));
    case 'Overdue':
      return tasks.filter((t) => !t.completed && isPast(parseISO(t.date)) && t.date !== today);
    case 'Completed':
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
}

function getStats(tasks) {
  return {
    total: tasks.length,
    inProgress: tasks.filter((t) => !t.completed && !isPast(parseISO(t.date))).length,
    completed: tasks.filter((t) => t.completed).length,
    overdue: tasks.filter((t) => !t.completed && isPast(parseISO(t.date))).length,
  };
}

export default function TasksPage() {
  const { tasks, addTask, removeTask, updateTask, toggleComplete } = useTaskStore();
  const [tab, setTab] = useState('All Tasks');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const filtered = filterTasks(tasks, tab).filter(
    (t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.subject?.toLowerCase().includes(search.toLowerCase())
  );
  const stats = getStats(tasks);

  function handleAdd(task) {
    addTask({ ...task, completed: false });
  }

  function handleEdit(task) {
    updateTask(task.id, task);
    setEditTask(null);
  }

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center px-2 py-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
            <div className="text-gray-500 text-sm">Manage and organize your daily tasks</div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              className="border rounded px-4 py-2 w-full sm:w-64"
              placeholder="Search tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow hover:bg-indigo-700 whitespace-nowrap"
              onClick={() => setShowAdd(true)}
            >
              + Add Task
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {TABS.map((t) => (
            <button
              key={t}
              className={`px-4 py-1 rounded-full font-semibold text-sm ${tab === t ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Total Tasks</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">In Progress</div>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Completed</div>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Overdue</div>
            <div className="text-2xl font-bold">{stats.overdue}</div>
          </div>
        </div>
        {/* Task List */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-4">Tasks</h2>
          {filtered.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No tasks found.</div>
          ) : (
            <ul className="divide-y">
              {filtered.map((task) => (
                <li key={task.id} className="py-4 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="mt-1 accent-indigo-600"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Normal' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{task.priority} Priority</span>
                      {task.completed && <span className="text-xs px-2 py-0.5 rounded font-semibold bg-green-100 text-green-700">Completed</span>}
                      {!task.completed && isPast(parseISO(task.date)) && <span className="text-xs px-2 py-0.5 rounded font-semibold bg-red-100 text-red-700">Overdue</span>}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 truncate">{task.subject}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      {task.completed ? (
                        <span>Completed: {format(parseISO(task.date), 'MMM d, yyyy')}</span>
                      ) : (
                        <span>Due: {format(parseISO(task.date), 'MMM d, yyyy')}</span>
                      )}
                      {task.time && <span>{task.time}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      className="text-gray-400 hover:text-indigo-600"
                      onClick={() => setEditTask(task)}
                      aria-label="Edit task"
                    >
                      <span className="material-icons text-base">edit</span>
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => removeTask(task.id)}
                      aria-label="Delete task"
                    >
                      <span className="material-icons text-base">delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <AddTaskModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onAdd={handleAdd}
      />
      {editTask && (
        <AddTaskModal
          open={!!editTask}
          onClose={() => setEditTask(null)}
          onAdd={(task) => handleEdit({ ...editTask, ...task })}
        />
      )}
    </div>
  );
}
