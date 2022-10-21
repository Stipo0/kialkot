import React, { Component } from "react";
import "./SideBand.css";

export class SideBand extends Component {
	static displayName = SideBand.name;

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={`side-band ${this.props.side}`}/>
		);
	}
}