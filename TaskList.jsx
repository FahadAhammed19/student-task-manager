import { TaskItem } from './TaskItem'

export function TaskList({ tasks, filter, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">✓</div>
        <h3>{filter === 'all' ? 'No tasks available' : `No ${filter} tasks`}</h3>
        <p>
          {filter === 'all'
            ? 'Add your first task above and start making progress.'
            : 'Try another filter or add a new task.'}
        </p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
