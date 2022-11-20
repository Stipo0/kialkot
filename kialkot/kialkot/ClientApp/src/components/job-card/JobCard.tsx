import classNames from "classnames";

import { MinJobModel } from "../../models/job.model";
import JobImage from "../job-image/JobImage";

import classes from "./JobCard.module.scss";

interface JobProps {
  job: MinJobModel;
  className?: string;
}

const Job = ({ job, className }: JobProps) => {
  const { image, name, shortDescription } = job;

  return (
    <div
      className={classNames(
        "d-flex box-shadow align-items-center p-3",
        classes.Job
      )}
    >
			<JobImage url={image}/>
			<div className="d-flex flex-column">
				<h5 className="ms-3">{name}</h5>
				<p className="ms-3 text-black-50">{shortDescription}</p>
			</div>
		</div>
  );
};

export default Job;
