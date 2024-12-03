import React from "react";
import Page500 from "./500";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    "Internal Server  message";
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Page500 />
        </div>
      );
    }

    return this.props.children;
  }
}
