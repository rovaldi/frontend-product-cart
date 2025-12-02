import React, { ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";
import { ERROR_BOUNDARY_MESSAGES, ERROR_BOUNDARY_ARIA } from "./constants";

import "./ErrorBoundary.css";

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary" role={ERROR_BOUNDARY_ARIA.role}>
          <div className="error-boundary__container">
            <h1 className="error-boundary__title">
              {ERROR_BOUNDARY_MESSAGES.title}
            </h1>
            <p className="error-boundary__message">
              {this.state.error?.message ||
                ERROR_BOUNDARY_MESSAGES.defaultMessage}
            </p>
            <button
              className="button__primary"
              onClick={this.handleReload}
              type="button"
            >
              {ERROR_BOUNDARY_MESSAGES.buttonLabel}
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
