import "./SideBand.scss";
import Shadow from "../../images/atmenet.png";
import classNames from "classnames";

interface SideBandProps {
	side?: "right" | "left";
}

const SideBand = ({side = "left"}: SideBandProps) => {
	return (
		<div className={classNames("side-band", side)}>
			<img src={Shadow} alt="Shadow" />
		</div>
	);
};

export default SideBand;