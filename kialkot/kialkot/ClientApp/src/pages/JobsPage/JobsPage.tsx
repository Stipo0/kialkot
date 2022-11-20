import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/job-card/JobCard";

import Page from "../../components/page/Page";
import { MinJobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";

const JobsPage = () => {
  const [jobs, setJobs] = useState<MinJobModel[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(await jobsService.getJobs());
    };

    fetchJobs();
  }, []);

  return (
    <Page title="Munkák" noCard>
      <div className="row">
        {jobs.map((job) => (
          <div key={job.id} onClick={()=> navigation("/jobs" + job.id)} className="col-lg-4 col-md-6 col-sm-12">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default JobsPage;
