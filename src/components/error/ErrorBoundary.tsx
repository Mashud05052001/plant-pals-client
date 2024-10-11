"use client";

import React, { ReactNode } from "react";

type TErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type TErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  TErrorBoundaryProps,
  TErrorBoundaryState
> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default ErrorBoundary;
