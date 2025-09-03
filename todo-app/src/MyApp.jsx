import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Check, Calendar, Sun, Moon, ChevronLeft } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('main');
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const [newTask, setNewTask] = useState({
    text: '',
    category: 'present',
    date: new Date().toISOString().split('T')[0],
    completed: false
  });

  useEffect(() => {
    // Tasks will be stored in memory during the session
  }, []);

  const categoryColors = {
    present: { bg: '#fce7f3', border: '#f9a8d4', dot: '#ec4899' },
    future: { bg: '#fef3c7', border: '#fcd34d', dot: '#f59e0b' },
    other: { bg: '#fed7aa', border: '#fdba74', dot: '#f97316' }
  };

  const categoryColorsDark = {
    present: { bg: '#831843', border: '#be185d', dot: '#ec4899' },
    future: { bg: '#92400e', border: '#d97706', dot: '#f59e0b' },
    other: { bg: '#9a3412', border: '#ea580c', dot: '#f97316' }
  };

  const getCurrentColors = (category) => {
    return darkMode ? categoryColorsDark[category] : categoryColors[category];
  };

  const addTask = () => {
    if (newTask.text.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask({
        text: '',
        category: 'present',
        date: new Date().toISOString().split('T')[0],
        completed: false
      });
      setCurrentView('main');
    }
  };

  const updateTask = () => {
    setTasks(tasks.map(task =>
      task.id === editingTask.id ? { ...editingTask } : task
    ));
    setEditingTask(null);
    setCurrentView('main');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (task) => {
    setEditingTask({ ...task });
    setCurrentView('add');
  };

  const getTasksByDate = () => {
    const tasksByDate = {};
    tasks.forEach(task => {
      if (!tasksByDate[task.date]) {
        tasksByDate[task.date] = [];
      }
      tasksByDate[task.date].push(task);
    });
    return tasksByDate;
  };

  const getFilteredTasks = (dateTasks) => {
    if (filter === 'completed') return dateTasks.filter(task => task.completed);
    if (filter === 'pending') return dateTasks.filter(task => !task.completed);
    return dateTasks;
  };

  const isTaskOverdue = (taskDate) => {
    const today = new Date().toISOString().split('T')[0];
    return taskDate < today;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateString === today.toISOString().split('T')[0]) return 'Today';
    if (dateString === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  // **ALTERED: CSS styles**
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#111827' : '#f0f2f5', // **Changed light mode background**
      transition: 'all 0.3s',
      padding: '24px'
    },
    card: {
      backgroundColor: darkMode ? '#1f2937' : '#f7f7f7', // **Changed light mode card background**
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      maxWidth: '500px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: darkMode ? '#ffffff' : '#1f2937',
      margin: 0
    },
    button: {
      padding: '12px 16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px',
      fontWeight: '500'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #ec4899, #f97316)',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'transform 0.2s',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      border: `2px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
      color: darkMode ? '#9ca3af' : '#6b7280',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: `2px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: darkMode ? '#374151' : '#ffffff',
      color: darkMode ? '#ffffff' : '#1f2937',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    select: {
      padding: '8px 12px',
      border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
      borderRadius: '8px',
      backgroundColor: darkMode ? '#374151' : '#ffffff',
      color: darkMode ? '#d1d5db' : '#374151',
      outline: 'none'
    },
    categorySection: {
      marginBottom: '24px'
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    categoryDot: {
      width: '16px',
      height: '16px',
      borderRadius: '50%'
    },
    categoryTitle: {
      fontWeight: '600',
      color: darkMode ? '#d1d5db' : '#374151',
      fontSize: '14px'
    },
    taskCard: {
      padding: '16px',
      borderRadius: '12px',
      borderLeft: '4px solid',
      marginBottom: '12px',
      transition: 'all 0.2s'
    },
    taskContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    checkButton: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '2px solid #d1d5db',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    },
    taskText: {
      flex: 1,
      fontSize: '14px',
      fontWeight: '500',
      color: darkMode ? '#ffffff' : '#1f2937'
    },
    taskMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '4px'
    },
    taskActions: {
      display: 'flex',
      gap: '4px'
    },
    actionButton: {
      padding: '4px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#9ca3af',
      transition: 'color 0.2s'
    },
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    mainHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '32px'
    },
    mainTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: darkMode ? '#ffffff' : '#1f2937'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px'
    },
    dateCard: {
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      transition: 'all 0.3s'
    },
    dateHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    dateInfo: {
      flex: 1
    },
    dateTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: darkMode ? '#ffffff' : '#1f2937'
    },
    dateSubtitle: {
      fontSize: '12px',
      color: '#9ca3af'
    },
    dayCircle: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #ec4899, #f97316)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      borderRadius: '4px',
      marginBottom: '16px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #ec4899, #f97316)',
      transition: 'width 0.3s'
    },
    emptyState: {
      textAlign: 'center',
      padding: '64px 0'
    },
    emptyIcon: {
      width: '64px',
      height: '64px',
      color: '#d1d5db',
      margin: '0 auto 16px'
    },
    emptyTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: darkMode ? '#9ca3af' : '#6b7280',
      marginBottom: '8px'
    },
    emptyText: {
      color: '#9ca3af'
    }
  };

  if (currentView === 'add') {
    const currentTask = editingTask || newTask;
    const isEditing = !!editingTask;

    return (
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <button
              onClick={() => {
                setCurrentView('main');
                setEditingTask(null);
              }}
              style={{...styles.button, backgroundColor: 'transparent'}}
            >
              <ChevronLeft size={20} color={darkMode ? '#9ca3af' : '#6b7280'} />
            </button>
            <h1 style={styles.title}>
                {isEditing ? 'EDIT TASK' : 'TO-DO LIST'}
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{...styles.button, backgroundColor: 'transparent'}}
            >
              {darkMode ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6b7280" />}
            </button>
          </div>

          {/* Date Selection */}
          <div style={{marginBottom: '24px'}}>
            <label style={{display: 'block', fontSize: '14px', fontWeight: '600', color: darkMode ? '#d1d5db' : '#374151', marginBottom: '8px'}}>
              DATE:
            </label>
            <input
              type="date"
              value={currentTask.date}
              onChange={(e) => {
                if (isEditing) {
                  setEditingTask({ ...editingTask, date: e.target.value });
                } else {
                  setNewTask({ ...newTask, date: e.target.value });
                }
              }}
              style={styles.input}
            />
          </div>

          {/* Task Categories */}
          <div>
            {/* Present Self */}
            <div style={styles.categorySection}>
              <div style={styles.categoryHeader}>
                <div style={{...styles.categoryDot, backgroundColor: '#f59e0b'}}></div>
                <h3 style={styles.categoryTitle}>FOR MY PRESENT SELF</h3>
              </div>
              {currentTask.category === 'present' ? (
                <input
                  type="text"
                  value={currentTask.text}
                  onChange={(e) => {
                    if (isEditing) {
                      setEditingTask({ ...editingTask, text: e.target.value });
                    } else {
                      setNewTask({ ...newTask, text: e.target.value });
                    }
                  }}
                  placeholder="Enter task for present self..."
                  style={{
                    ...styles.input,
                    backgroundColor: getCurrentColors('present').bg,
                    borderColor: getCurrentColors('present').border
                  }}
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => {
                    if (isEditing) {
                      setEditingTask({ ...editingTask, category: 'present', text: '' });
                    } else {
                      setNewTask({ ...newTask, category: 'present', text: '' });
                    }
                  }}
                  style={{
                    ...styles.input,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '8px',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    border: `2px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                    backgroundColor: darkMode ? '#374151' : '#ffffff',
                    textAlign: 'left',
                    height: '48px'
                  }}
                >
                  <Plus size={16} />
                  Add task for present self
                </button>
              )}
            </div>
            {/* Future Self */}
            <div style={styles.categorySection}>
              <div style={styles.categoryHeader}>
                <div style={{...styles.categoryDot, backgroundColor: '#f59e0b'}}></div>
                <h3 style={styles.categoryTitle}>FOR MY FUTURE SELF</h3>
              </div>
              {currentTask.category === 'future' ? (
                <input
                  type="text"
                  value={currentTask.text}
                  onChange={(e) => {
                    if (isEditing) {
                      setEditingTask({ ...editingTask, text: e.target.value });
                    } else {
                      setNewTask({ ...newTask, text: e.target.value });
                    }
                  }}
                  placeholder="Enter task for future self..."
                  style={{
                    ...styles.input,
                    backgroundColor: getCurrentColors('future').bg,
                    borderColor: getCurrentColors('future').border
                  }}
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => {
                    if (isEditing) {
                      setEditingTask({ ...editingTask, category: 'future', text: '' });
                    } else {
                      setNewTask({ ...newTask, category: 'future', text: '' });
                    }
                  }}
                  style={{
                    ...styles.input,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '8px',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    border: `2px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                    backgroundColor: darkMode ? '#374151' : '#ffffff',
                    textAlign: 'left',
                    height: '48px'
                  }}
                >
                  <Plus size={16} />
                  Add task for future self
                </button>
              )}
            </div>

            {/* Other */}
            <div style={styles.categorySection}>
              <div style={styles.categoryHeader}>
                <div style={{...styles.categoryDot, backgroundColor: '#f97316'}}></div>
                <h3 style={styles.categoryTitle}>FOR OTHER</h3>
              </div>
              {currentTask.category === 'other' ? (
                <input
                  type="text"
                  value={currentTask.text}
                  onChange={(e) => {
                    if (isEditing) {
                      setEditingTask({ ...editingTask, text: e.target.value });
                    } else {
                      setNewTask({ ...newTask, text: e.target.value });
                    }
                  }}
                  placeholder="Enter task for others..."
                  style={{
                    ...styles.input,
                    backgroundColor: getCurrentColors('other').bg,
                    borderColor: getCurrentColors('other').border
                  }}
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => {
                    if (isEditing) {
                      setEditingTask({ ...editingTask, category: 'other', text: '' });
                    } else {
                      setNewTask({ ...newTask, category: 'other', text: '' });
                    }
                  }}
                  style={{
                    ...styles.input,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    border: `2px solid ${darkMode ? '#4b5563' : '#d1d5db'}`
                  }}
                >
                  <Plus size={16} />
                  Add task for others
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {currentTask.text && (
            <div style={{display: 'flex', gap: '12px', marginTop: '32px'}}>
              <button
                onClick={isEditing ? updateTask : addTask}
                style={styles.primaryButton}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                {isEditing ? 'Update Task' : 'Add Task'}
              </button>
              <button
                onClick={() => {
                  setCurrentView('main');
                  setEditingTask(null);
                  setNewTask({
                    text: '',
                    category: 'present',
                    date: new Date().toISOString().split('T')[0],
                    completed: false
                  });
                }}
                style={styles.secondaryButton}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main View - Task Cards by Date
  const tasksByDate = getTasksByDate();
  const sortedDates = Object.keys(tasksByDate).sort();

  return (
    <div style={styles.container}>
      <div style={styles.mainContainer}>
        {/* Header */}
        <div style={styles.mainHeader}>
          <h1 style={styles.mainTitle}>My Tasks</h1>
          <div style={styles.controls}>
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{...styles.button, backgroundColor: 'transparent'}}
            >
              {darkMode ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6b7280" />}
            </button>
            
            {/* Add task button */}
            <button
              onClick={() => setCurrentView('add')}
              style={{...styles.primaryButton, display: 'flex', alignItems: 'center', gap: '8px'}}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Task Cards Grid */}
        {sortedDates.length === 0 ? (
          <div style={styles.emptyState}>
            <Calendar style={styles.emptyIcon} />
            <h3 style={styles.emptyTitle}>No tasks yet</h3>
            <p style={styles.emptyText}>Start by adding your first task!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {sortedDates.map(date => {
              const dateTasks = tasksByDate[date];
              const filteredTasks = getFilteredTasks(dateTasks);
              
              if (filteredTasks.length === 0) return null;
              
              const completedCount = dateTasks.filter(task => task.completed).length;
              const totalCount = dateTasks.length;
              
              return (
                <div key={date} style={styles.dateCard}>
                  {/* Date Header */}
                  <div style={styles.dateHeader}>
                    <div style={styles.dateInfo}>
                      <h3 style={styles.dateTitle}>
                        {formatDate(date)}
                      </h3>
                      <p style={styles.dateSubtitle}>
                        {completedCount}/{totalCount} completed
                      </p>
                    </div>
                    <div style={styles.dayCircle}>
                      {getDayName(date)[0]}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`
                      }}
                    ></div>
                  </div>

                  {/* Tasks */}
                  <div>
                    {filteredTasks
                      .sort((a, b) => {
                        const categoryOrder = { 'present': 0, 'future': 1, 'other': 2 };
                        return categoryOrder[a.category] - categoryOrder[b.category];
                      })
                      .map(task => {
                        const colors = getCurrentColors(task.category);
                        return (
                          <div
                            key={task.id}
                            style={{
                              ...styles.taskCard,
                              backgroundColor: colors.bg,
                              borderLeftColor: colors.border
                            }}
                          >
                            <div style={styles.taskContent}>
                              <button
                                onClick={() => toggleComplete(task.id)}
                                style={{
                                  ...styles.checkButton,
                                  backgroundColor: task.completed ? '#10b981' : 'transparent',
                                  borderColor: task.completed ? '#10b981' : '#d1d5db',
                                  color: task.completed ? 'white' : 'transparent'
                                }}
                              >
                                {task.completed && <Check size={12} />}
                              </button>
                              
                              <div style={{flex: 1}}>
                                <p style={{
                                  ...styles.taskText,
                                  textDecoration: task.completed ? 'line-through' : 'none',
                                  color: task.completed ? '#9ca3af' :
                                         isTaskOverdue(task.date) && !task.completed ? '#ef4444' :
                                         (darkMode ? '#ffffff' : '#1f2937')
                                }}>
                                  {task.text}
                                </p>
                                <div style={styles.taskMeta}>
                                  <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: colors.dot
                                  }}></div>
                                  <span style={{fontSize: '12px', color: '#9ca3af'}}>
                                    {task.category === 'present' ? 'Present Self' :
                                      task.category === 'future' ? 'Future Self' : 'Other'}
                                  </span>
                                  {/* Status badges */}
                                  {isTaskOverdue(task.date) && !task.completed && (
                                    <span style={{
                                      fontSize: '11px',
                                      color: '#ef4444',
                                      fontWeight: '600',
                                      backgroundColor: '#fef2f2',
                                      padding: '2px 6px',
                                      borderRadius: '12px',
                                      border: '1px solid #fecaca'
                                    }}>
                                      Overdue
                                    </span>
                                  )}
                                  {task.completed && (
                                    <span style={{
                                      fontSize: '11px',
                                      color: '#10b981',
                                      fontWeight: '600',
                                      backgroundColor: '#f0fdf4',
                                      padding: '2px 6px',
                                      borderRadius: '12px',
                                      border: '1px solid #bbf7d0'
                                    }}>
                                      Completed
                                    </span>
                                  )}
                                  {!task.completed && !isTaskOverdue(task.date) && (
                                    <span style={{
                                      fontSize: '11px',
                                      color: '#f59e0b',
                                      fontWeight: '600',
                                      backgroundColor: '#fffbeb',
                                      padding: '2px 6px',
                                      borderRadius: '12px',
                                      border: '1px solid #fde68a'
                                    }}>
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div style={styles.taskActions}>
                                {!task.completed && (
                                  <button
                                    onClick={() => startEdit(task)}
                                    style={{...styles.actionButton, ':hover': {color: '#3b82f6'}}}
                                    onMouseOver={(e) => e.target.style.color = '#3b82f6'}
                                    onMouseOut={(e) => e.target.style.color = '#9ca3af'}
                                  >
                                    <Edit3 size={16} />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteTask(task.id)}
                                  style={styles.actionButton}
                                  onMouseOver={(e) => e.target.style.color = '#ef4444'}
                                  onMouseOut={(e) => e.target.style.color = '#9ca3af'}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;

