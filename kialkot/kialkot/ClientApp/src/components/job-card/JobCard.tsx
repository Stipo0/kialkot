import classNames from "classnames";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { MinJobModel } from "../../models/job.model";
import JobImage from "../job-image/JobImage";

import classes from "./JobCard.module.scss";

interface JobProps {
  job: MinJobModel;
  className?: string;
  isLoggedIn: boolean;
}

const Job = ({ job, className, isLoggedIn }: JobProps) => {
  const { id, image, name, creator, jobType, deadline } = job;
  const creatorName = creator.firstName + " " + creator.lastName;
  const navigation = useNavigate();

  const cardAction = () => {
    isLoggedIn
      ? navigation("/job/" + id)
      : alert("A részletek megjelenítéséhez jelentkezz be!");
  };

  return (
    <div
      className={classNames(
        "d-flex box-shadow align-items-center p-3",
        classes.Job
      )}
      onClick={cardAction}
    >
      <JobImage url={image} />
      <div className="d-flex flex-column">
        <h5 className="ms-3">{name}</h5>
        {isLoggedIn && (
          <>
            <p className="ms-2">
              Létrehozó: <span className="text-black-50">{creatorName}</span>
            </p>
          </>
        )}
        <p className="ms-2">
          Tipus: <span className="text-black-50">{jobType}</span>
        </p>
        <p className="ms-2">
          Határidő:{" "}
          <span className="text-black-50">
            {moment(deadline).format("YYYY. MM DD.")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Job;
