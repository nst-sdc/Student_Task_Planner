'use client';

import { format, isValid } from 'date-fns';
import { ArrowUturnLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import useTaskStore from '../../store/taskStore';
import Link from 'next/link';

export default function Bin() {
  const { bin, restoreTask, permanentlyDeleteTask } = useTaskStore();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (!isValid(date)) {
        return 'Invalid date';
      }
      return format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Bin</h1>
          <Link
            href="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Tasks
          </Link>
        </div>

        {bin.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No deleted tasks found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bin.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => restoreTask(task.id)}
                      className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="Restore Task"
                    >
                      <ArrowUturnLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => permanentlyDeleteTask(task.id)}
                      className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      title="Delete Permanently"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {task.category}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Due: {formatDate(task.deadline)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Deleted: {formatDate(task.deletedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 