import React, { Component } from "react";
import { Page } from "../../components/page/Page";

export class Registration extends Component {
  static displayName = Registration.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }

  decrementCounter() {
    this.setState({
      currentCount: this.state.currentCount - 1,
    });
  }

  render() {
    return (
      <Page title="Counter">
        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">
          Current count: <strong>{this.state.currentCount}</strong>
        </p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>
          Increment
        </button>
        <button className="btn btn-primary m-2" onClick={this.decrementCounter}>
          Decrement
        </button>
      </Page>
    );
  }
}
