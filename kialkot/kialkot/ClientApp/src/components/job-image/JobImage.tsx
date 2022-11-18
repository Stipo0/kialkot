import classNames from "classnames";

import classes from "./JobImage.module.scss";

interface JobImageProps {
	url: string;
	small?: boolean;
	className?: string;
}

const JobImage = ({ url, small, className}: JobImageProps) => {
	return (
		<div className={classNames(
			classes.JobImage,
			{ [classes.Small] : small },
			className
		)}
		style={{backgroundImage: `url(${url})` }}
		/>
	)
};

export default JobImage;