import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Student Task Manager', () => {
  beforeEach(() => localStorage.clear())

  it('adds a valid task and updates the total', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/what needs your attention/i), 'Submit chemistry report')
    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByText('Submit chemistry report')).toBeInTheDocument()
    expect(screen.getByText('4', { selector: '.stat-block strong' })).toBeInTheDocument()
  })

  it('rejects an empty task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter a task before adding it.')
  })

  it('marks tasks complete and filters the list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByLabelText(/mark finish the react practice exercises as completed/i))
    await user.click(screen.getByRole('button', { name: /completed/i }))

    expect(screen.getByText('Finish the React practice exercises')).toBeInTheDocument()
    expect(screen.queryByText('Prepare questions for the next lesson')).not.toBeInTheDocument()
  })

  it('asks for confirmation before deleting', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /delete prepare questions/i }))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete task/i }))
    expect(screen.queryByText('Prepare questions for the next lesson')).not.toBeInTheDocument()
  })
})
