'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/15">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="max-w-md text-muted-foreground">
            We encountered an error. Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
