import classNames from "classnames";
import "./SideBand.scss";

interface SideBandProps {
	side?: "right" | "left";
}

const SideBand = ({side = "left"}: SideBandProps) => {
	return (
		<div className={"side-band " + side} />
	);
};

export default SideBand;