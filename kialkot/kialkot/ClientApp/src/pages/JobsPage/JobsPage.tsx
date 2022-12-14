import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessController from "../../components/access-controller/AccessController";
import ActionButton from "../../components/action-button/ActionButton";
import JobCard from "../../components/job-card/JobCard";

import Page from "../../components/page/Page";
import { JobStatusEnum } from "../../enums/job.status.enum";
import { MinJobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";
import { HanleCatch } from "../../util/handleCatch";

interface JobsPageProps {
  isLoggedIn: boolean;
}

const JobsPage = ({ isLoggedIn }: JobsPageProps) => {
  const [jobs, setJobs] = useState<MinJobModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async (isLoggedIn: boolean) => {
      try {
        isLoggedIn
          ? setJobs(await jobsService.getJobs(JobStatusEnum.Open))
          : setJobs(await jobsService.getJobsAnonim());
      } catch (e) {
        alert(HanleCatch(e));
      }
    };

    fetchJobs(isLoggedIn);
  }, [isLoggedIn]);

  const fetchJobs = async (jobStatus: JobStatusEnum) => {
    try {
      setJobs(await jobsService.getJobs(jobStatus));
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  const goToCreateJobPage = () => {
    navigate("/job/edit");
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <AccessController allowedFor={["User"]}>
            <ActionButton onClick={goToCreateJobPage}>
              Munka létrehozása
            </ActionButton>
          </AccessController>
          <label htmlFor={"status"} className="m-1">
            {"Státusz: "}
          </label>
          <select
            name={"status"}
            onChange={(e) => fetchJobs(Number(e.target.value))}
          >
            {JobStatusEnum.toOptions.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </select>
        </>
      )}
      <Page title="Munkák" noCard>
        <div className="row">
          {jobs.map((job) => (
            <div key={job.id} className="col-lg-4 col-md-6 col-sm-12">
              <JobCard job={job} isLoggedIn={isLoggedIn} />
            </div>
          ))}
        </div>
      </Page>
    </>
  );
};

export default JobsPage;
