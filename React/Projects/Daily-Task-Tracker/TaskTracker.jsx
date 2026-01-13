import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, ChevronLeft, ChevronRight, Calendar, TrendingUp } from 'lucide-react';

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [contributions, setContributions] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('taskContributions');
    if (saved) {
      setContributions(JSON.parse(saved));
    }
  }, []);

  const saveContributions = (newContribs) => {
    setContributions(newContribs);
    localStorage.setItem('taskContributions', JSON.stringify(newContribs));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (id) => {
    const today = new Date().toISOString().split('T')[0];
    const newContribs = { ...contributions };
    newContribs[today] = (newContribs[today] || 0) + 1;
    saveContributions(newContribs);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getColor = (count) => {
    if (!count) return 'bg-slate-100 hover:bg-slate-200';
    if (count === 1) return 'bg-emerald-200 hover:bg-emerald-300';
    if (count === 2) return 'bg-emerald-400 hover:bg-emerald-500';
    if (count <= 4) return 'bg-emerald-500 hover:bg-emerald-600';
    return 'bg-emerald-600 hover:bg-emerald-700';
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const totalTasks = Object.values(contributions).reduce((a, b) => a + b, 0);
  const todayTasks = contributions[new Date().toISOString().split('T')[0]] || 0;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate streak
  const dates = Object.keys(contributions).sort().reverse();
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  for (let i = 0; i < dates.length; i++) {
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - i);
    const expectedDateStr = expectedDate.toISOString().split('T')[0];
    if (dates[i] === expectedDateStr && contributions[dates[i]] > 0) {
      streak++;
    } else {
      break;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-xl shadow-lg">
              <Calendar className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Task Tracker</h1>
              <p className="text-sm text-slate-600">Stay consistent, build habits</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Check className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-slate-800">{totalTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Current Streak</p>
                <p className="text-3xl font-bold text-slate-800">{streak} days</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-emerald-100 font-medium">Today's Tasks</p>
                <p className="text-3xl font-bold text-white">{todayTasks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Activity Calendar</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} className="text-slate-600" />
              </button>
              <span className="text-lg font-semibold text-slate-700 min-w-[180px] text-center">
                {monthName}
              </span>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="text-slate-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-slate-600 pb-2">
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="aspect-square" />;
              }
              const dateStr = day.toISOString().split('T')[0];
              const count = contributions[dateStr] || 0;
              const isToday = dateStr === new Date().toISOString().split('T')[0];
              
              return (
                <div
                  key={dateStr}
                  className={`aspect-square rounded-xl ${getColor(count)} ${
                    isToday ? 'ring-4 ring-blue-400 ring-offset-2' : ''
                  } transition-all cursor-pointer group relative shadow-sm`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-700">{day.getDate()}</span>
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 shadow-xl">
                    <div className="font-semibold">{day.toLocaleString('default', { month: 'short', day: 'numeric' })}</div>
                    <div className="text-emerald-300">{count} task{count !== 1 ? 's' : ''} completed</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 mt-6 text-sm text-slate-600">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-slate-100 rounded" />
              <div className="w-4 h-4 bg-emerald-200 rounded" />
              <div className="w-4 h-4 bg-emerald-400 rounded" />
              <div className="w-4 h-4 bg-emerald-500 rounded" />
              <div className="w-4 h-4 bg-emerald-600 rounded" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Today's Tasks</h2>
          
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="What do you want to accomplish today?"
              className="flex-1 px-4 py-3 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-slate-400" size={32} />
                </div>
                <p className="text-slate-500 font-medium">No tasks yet</p>
                <p className="text-sm text-slate-400 mt-1">Add your first task to get started!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group border border-slate-200"
                >
                  <button
                    onClick={() => completeTask(task.id)}
                    className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all flex-shrink-0"
                  >
                    <Check size={20} />
                  </button>
                  <span className="flex-1 text-slate-800 font-medium">{task.text}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}