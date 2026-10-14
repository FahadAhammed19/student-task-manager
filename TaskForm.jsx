import { useState } from 'react'

export function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) {
      setError('Enter a task before adding it.')
      return
    }

    onAdd(cleanTitle)
    setTitle('')
    setError('')
  }

  function handleChange(event) {
    setTitle(event.target.value)
    if (error && event.target.value.trim()) setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="task-title">What needs your attention?</label>
      <div className="input-row">
        <input
          id="task-title"
          name="task-title"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="e.g. Review chapter 4 notes"
          aria-describedby={error ? 'task-error' : undefined}
          aria-invalid={Boolean(error)}
          maxLength={120}
        />
        <button className="primary-button" type="submit">
          <span aria-hidden="true">+</span> Add task
        </button>
      </div>
      <div className="form-meta">
        <p id="task-error" className="form-error" role="alert">{error}</p>
        <span>{title.length}/120</span>
      </div>
    </form>
  )
}
