import React, { Component } from "react";

export class Page extends Component {
  static displayName = Page.name;

  render() {
    return (
      <div className="container pt-3 ">
        {this.props.title ? <h1>{this.props.title}</h1> : null}
        {this.props.children}
      </div>
    );
  }
}
