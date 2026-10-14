import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <div className="error-mark" aria-hidden="true">!</div>
          <p className="eyebrow">Something went wrong</p>
          <h1>Your task list needs a quick refresh.</h1>
          <p>Your saved tasks are safe. Reload the page to try again.</p>
          <button className="primary-button" onClick={() => window.location.reload()}>
            Reload task manager
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
