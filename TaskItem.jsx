export function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${task.completed ? 'pending' : 'completed'}`}
        />
        <span className="checkmark" aria-hidden="true">✓</span>
      </label>
      <div className="task-copy">
        <span className="task-title">{task.title}</span>
        <span className="task-status">{task.completed ? 'Completed' : 'Pending'}</span>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(task)}
        aria-label={`Delete ${task.title}`}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}
