import { useEffect, useState } from "react";
import Job from "../../components/job/Job";

import Page from "../../components/page/Page";
import { JobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";

const JobsPage = () => {
  const [jobs, setJobs] = useState<JobModel[]>([]);

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
          <div key={job.id} className="col-lg-4 col-md-6 col-sm-12">
            <Job job={job} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default JobsPage;
