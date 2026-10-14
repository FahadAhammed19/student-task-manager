import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card } from './Card'
import { DeleteDialog } from './DeleteDialog'
import { Stats } from './Stats'
import { TaskForm } from './TaskForm'
import { TaskList } from './TaskList'

const FILTERS = ['all', 'pending', 'completed']
const STORAGE_KEY = 'studyflow.tasks'

const starterTasks = [
  { id: 'starter-1', title: 'Review today’s class notes', completed: true },
  { id: 'starter-2', title: 'Finish the React practice exercises', completed: false },
  { id: 'starter-3', title: 'Prepare questions for the next lesson', completed: false },
]

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : starterTasks
  } catch {
    return starterTasks
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all')
  const [taskToDelete, setTaskToDelete] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const completed = tasks.filter((task) => task.completed).length
  const remaining = tasks.length - completed

  const visibleTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter((task) => task.completed)
    if (filter === 'pending') return tasks.filter((task) => !task.completed)
    return tasks
  }, [filter, tasks])

  function addTask(title) {
    setTasks((current) => [
      { id: crypto.randomUUID(), title, completed: false },
      ...current,
    ])
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function confirmDelete() {
    setTasks((current) => current.filter((task) => task.id !== taskToDelete.id))
    setTaskToDelete(null)
  }

  const closeDeleteDialog = useCallback(() => setTaskToDelete(null), [])

  return (
    <>
      <div className="app-shell">
        <header className="topbar">
          <a className="brand" href="#main" aria-label="StudyFlow home">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>StudyFlow</span>
          </a>
          <span className="today-label">Student task manager</span>
        </header>

        <main id="main">
          <section className="hero">
            <div>
              <p className="eyebrow">Plan less. Finish more.</p>
              <h1>Make space for<br /><em>what matters.</em></h1>
              <p className="hero-copy">
                Keep assignments clear, track your momentum, and move through the day one task at a time.
              </p>
            </div>
            <div className="hero-number" aria-hidden="true">
              <span>{remaining}</span>
              <small>left to do</small>
            </div>
          </section>

          <Card className="composer-card">
            <TaskForm onAdd={addTask} />
          </Card>

          <Stats total={tasks.length} completed={completed} remaining={remaining} />

          <Card className="tasks-card">
            <div className="list-heading">
              <div>
                <p className="eyebrow">Your workload</p>
                <h2>Today’s tasks</h2>
              </div>
              <div className="filters" aria-label="Filter tasks">
                {FILTERS.map((option) => (
                  <button
                    key={option}
                    className={filter === option ? 'is-active' : ''}
                    type="button"
                    onClick={() => setFilter(option)}
                    aria-pressed={filter === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <TaskList
              tasks={visibleTasks}
              filter={filter}
              onToggle={toggleTask}
              onDelete={setTaskToDelete}
            />
          </Card>
        </main>

        <footer>Built for focused students · Your tasks stay in this browser</footer>
      </div>

      <DeleteDialog
        task={taskToDelete}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </>
  )
}
