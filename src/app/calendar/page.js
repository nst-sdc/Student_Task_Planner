'use client';
import { useState } from 'react';
import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameDay, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { enIN } from 'date-fns/locale';
import AddTaskModal from '@/components/AddTaskModal';
import useTaskStore from '@/store/taskStore';

function getISTDate(date) {
  // Convert to IST (UTC+5:30)
  return new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
}

function getMonthMatrix(year, month) {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));
  const start = startOfWeek(firstDay, { weekStartsOn: 0 });
  const end = endOfWeek(lastDay, { weekStartsOn: 0 });
  const matrix = [];
  let day = start;
  while (day <= end) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    matrix.push(week);
  }
  return matrix;
}

export default function CalendarPage() {
  const [view, setView] = useState('month');
  const [modalOpen, setModalOpen] = useState(false);
  const todayIST = getISTDate(new Date());
  const [currentDate, setCurrentDate] = useState(todayIST);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthMatrix = getMonthMatrix(year, month);
  const monthName = format(currentDate, 'LLLL yyyy', { locale: enIN });

  // Use global tasks from Zustand
  const { tasks, addTask } = useTaskStore();

  function handleAddTask(task) {
    addTask(task);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex w-full overflow-x-hidden">
      <main className="flex-1 flex flex-col w-full min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 py-4 bg-white border-b w-full min-w-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Calendar</h1>
            <div className="text-gray-500 text-sm">Plan and organize your tasks</div>
          </div>
          <button
            className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm shadow hover:bg-blue-700"
            onClick={() => setModalOpen(true)}
          >
            <span className="hidden sm:inline">+ Add Task</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
        {/* Calendar Controls */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white border-b w-full min-w-0">
          <div className="flex items-center gap-2">
            <button
              className="text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setCurrentDate((d) => subMonths(d, 1))}
              aria-label="Previous month"
            >&#60;</button>
            <span className="font-semibold text-gray-700">{monthName}</span>
            <button
              className="text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setCurrentDate((d) => addMonths(d, 1))}
              aria-label="Next month"
            >&#62;</button>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded font-semibold text-sm ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setView('month')}
            >Month</button>
            <button
              className={`px-3 py-1 rounded font-semibold text-sm ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setView('week')}
            >Week</button>
            <button
              className={`px-3 py-1 rounded font-semibold text-sm ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setView('day')}
            >Day</button>
          </div>
        </div>
        {/* Calendar Grid or Coming Soon */}
        <div className="p-2 sm:p-6 w-full min-w-0">
          {view === 'month' ? (
            <div className="bg-white rounded-xl shadow p-2 sm:p-6 w-full overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="text-gray-500 text-sm">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <th key={d} className="py-2 font-medium">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthMatrix.map((week, i) => (
                    <tr key={i}>
                      {week.map((date, j) => {
                        const isCurrentMonth = isSameMonth(date, currentDate);
                        const isCurrentDay = isToday(date);
                        const dayTasks = tasks.filter(e => e.date === format(date, 'yyyy-MM-dd'));
                        return (
                          <td
                            key={j}
                            className={`h-20 align-top border border-gray-100 relative ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} ${isCurrentDay ? 'border-blue-500' : ''}`}
                          >
                            <div className={`absolute top-2 left-2 text-xs font-semibold ${isCurrentDay ? 'text-blue-600' : 'text-gray-700'}`}>{format(date, 'd')}</div>
                            <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
                              {dayTasks.map((event, idx) => (
                                <div key={idx} className={`px-2 py-1 rounded text-xs font-semibold truncate ${event.priority === 'High' ? 'bg-red-100 text-red-700' : event.priority === 'Normal' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                  {event.time ? <span className="font-normal text-gray-700 mr-1">{event.time}</span> : null}
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow p-8 w-full text-center text-gray-400 font-semibold text-lg">Coming soon...</div>
          )}
        </div>
        <AddTaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddTask}
        />
      </main>
    </div>
  );
}
