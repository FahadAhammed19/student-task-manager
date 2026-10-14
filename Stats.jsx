export function Stats({ total, completed, remaining }) {
  const progress = total ? Math.round((completed / total) * 100) : 0

  return (
    <section className="stats" aria-label="Task statistics">
      <div className="stat-block">
        <span>Total tasks</span>
        <strong>{total}</strong>
      </div>
      <div className="stat-block">
        <span>Completed</span>
        <strong>{completed}</strong>
      </div>
      <div className="stat-block accent-stat">
        <span>Remaining</span>
        <strong>{remaining}</strong>
      </div>
      <div className="progress-block">
        <div className="progress-label">
          <span>Overall progress</span>
          <strong>{progress}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Overall task progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  )
}
