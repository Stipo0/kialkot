import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessController from "../../components/access-controller/AccessController";
import Button from "../../components/button/Button";
import JobCard from "../../components/job-card/JobCard";

import Page from "../../components/page/Page";
import { MinJobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";

const JobsPage = () => {
  const [jobs, setJobs] = useState<MinJobModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(await jobsService.getJobs());
    };

    fetchJobs();
  }, []);

  const  goToCreateJobPage = () => {
    navigate("/job/edit");
  };

  return (
    <Page title="Munkák" noCard>
      <AccessController allowedFor={["User"]}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button className="w-100 mb-3" onClick={goToCreateJobPage}>
              Munka létrehozása
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="row">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="col-lg-4 col-md-6 col-sm-12"
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default JobsPage;
