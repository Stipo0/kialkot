import { Component } from "react";

export class TextField extends Component {
  static displayName = TextField.name;

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="form-group">
        <label className="mb-1">{this.props.label}</label>
        <input
          name={this.props.name}
          type={this.props.type ? this.props.type : "text"}
          className="form-control"
        >
          {this.props.label}
        </input>
      </div>
    );
  }
}
