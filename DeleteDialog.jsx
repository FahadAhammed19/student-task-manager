import { useEffect, useRef } from 'react'

export function DeleteDialog({ task, onCancel, onConfirm }) {
  const cancelRef = useRef(null)

  useEffect(() => {
    if (!task) return undefined
    cancelRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onCancel()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [task, onCancel])

  if (!task) return null

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <div
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-mark" aria-hidden="true">×</div>
        <p className="eyebrow">Delete task</p>
        <h2 id="dialog-title">Remove this task?</h2>
        <p id="dialog-description">
          “{task.title}” will be permanently removed from your list.
        </p>
        <div className="dialog-actions">
          <button ref={cancelRef} className="secondary-button" type="button" onClick={onCancel}>
            Keep task
          </button>
          <button className="danger-button" type="button" onClick={onConfirm}>
            Delete task
          </button>
        </div>
      </div>
    </div>
  )
}
