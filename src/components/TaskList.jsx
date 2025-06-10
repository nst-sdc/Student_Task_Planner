import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (!tasks.length) {
    return <div className="text-center text-gray-400 py-8">No tasks to show.</div>;
  }
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
} 