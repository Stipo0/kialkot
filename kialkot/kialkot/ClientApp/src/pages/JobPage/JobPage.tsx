import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../../components/page/Page";
import { JobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";

const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobModel>();

  useEffect(() => {
    const fetchJob = async (id: string) => setJob(await jobsService.getJob(id));
    if (id) {
      fetchJob(id);
    }
  }, [id]);

  return (
    <Page title={`${job?.name} részletes reírás`}>
      <div>
        <h6>Tipus:</h6>
        <p>{job?.jobType}</p>
        <h6>Leírás:</h6>
        <p>{job?.description}</p>
        <h6>Mellékletek:</h6>
        <img src={`${job?.image}`} alt={job?.name} width="50%" />
        <h6>Létrehozva: </h6>
        {job?.createdAt}
      </div>
    </Page>
  );
};

export default JobPage;
