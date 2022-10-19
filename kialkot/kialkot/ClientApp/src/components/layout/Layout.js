import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "../NavMenu/NavMenu";
import { SideBand } from "../SideBand/SideBand";
import "./Layout.css";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <SideBand side="left" />
        <div className="main">
          <NavMenu />
          <Container>{this.props.children}</Container>
        </div>
        <SideBand side="right" />
      </div>
    );
  }
}