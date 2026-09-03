import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Portfolio rendering error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-bg px-5 py-24 text-ink">
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface-strong p-8 text-center shadow-sm">
            <h1 className="font-heading text-2xl font-bold text-heading">
              Something went wrong
            </h1>
            <p className="mt-3 text-ink-2">
              Please refresh the page to try again.
            </p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
