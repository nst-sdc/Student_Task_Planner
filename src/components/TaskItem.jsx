import React from 'react';

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-b-0">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 accent-indigo-600"
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</span>
          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${task.priority === 'High' ? 'bg-red-100 text-red-600' : task.priority === 'Normal' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{task.priority}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <span>{task.subject}</span>
          <span>•</span>
          <span>{task.date}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">{task.description}</div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <button className="text-gray-400 hover:text-indigo-600" onClick={() => onEdit(task)} aria-label="Edit task"><span className="material-icons text-base">edit</span></button>
        <button className="text-gray-400 hover:text-red-500" onClick={() => onDelete(task.id)} aria-label="Delete task"><span className="material-icons text-base">delete</span></button>
        {task.overdue && <span className="text-xs text-red-500 font-semibold">Overdue</span>}
      </div>
    </div>
  );
} 