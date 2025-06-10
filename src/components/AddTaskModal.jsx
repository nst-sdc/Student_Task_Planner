import React, { useState } from 'react';

const PRIORITIES = ['High', 'Normal', 'Low'];

export default function AddTaskModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    date: '',
    description: '',
    priority: 'Normal',
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(form);
    setForm({ title: '', subject: '', date: '', description: '', priority: 'Normal' });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="title" value={form.title} onChange={handleChange} required placeholder="Title" className="border rounded px-3 py-2" />
          <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Subject" className="border rounded px-3 py-2" />
          <input name="date" value={form.date} onChange={handleChange} required type="date" className="border rounded px-3 py-2" />
          <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Description" className="border rounded px-3 py-2" />
          <div className="flex gap-2">
            {PRIORITIES.map((p) => (
              <label key={p} className={`px-3 py-1 rounded-full cursor-pointer border ${form.priority === p ? 'bg-indigo-100 border-indigo-400' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={form.priority === p}
                  onChange={handleChange}
                  className="sr-only"
                />
                {p}
              </label>
            ))}
          </div>
          <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700">Add Task</button>
        </form>
      </div>
    </div>
  );
} 