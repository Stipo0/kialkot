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
    <Page title={job?.name}>
      <div>
        <h6>Rövid Leírás:</h6>
        <p>{job?.shortDescription}</p>
        <h6>Hosszú Leírás:</h6>
        <p>{job?.longDescription}</p>
        <h6>Mellékletek:</h6>
        <img src={`${job?.image}`} alt={job?.name}  width="50%"/>
        <h6>Létrehozva: </h6>
        {job?.createdAt}
      </div>
    </Page>
  );
};

export default JobPage;
