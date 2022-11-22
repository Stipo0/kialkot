import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { MinJobModel } from "../../models/job.model";
import JobImage from "../job-image/JobImage";

import classes from "./JobCard.module.scss";

interface JobProps {
  job: MinJobModel;
  className?: string;
}

const Job = ({ job, className }: JobProps) => {
  const { id, image, name, creatorName, jobType, deadline } = job;
  const navigation = useNavigate();

  return (
    <div
      className={classNames(
        "d-flex box-shadow align-items-center p-3",
        classes.Job
      )}
      onClick={() => navigation("/job/" + id)}
    >
      <JobImage url={image} />
      <div className="d-flex flex-column">
        <h5 className="ms-3">{name}</h5>
        <p className="ms-2">
          Létrehozó: <span className="text-black-50">{creatorName}</span>
        </p>
        <p className="ms-2">
          Tipus: <span className="text-black-50">{jobType}</span>
        </p>
        <p className="ms-2">
          Határidő: <span className="text-black-50">{deadline}</span>
        </p>
      </div>
    </div>
  );
};

export default Job;
