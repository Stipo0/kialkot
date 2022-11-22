import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccessController from "../../components/access-controller/AccessController";
import Button from "../../components/button/Button";
import Page from "../../components/page/Page";
import { JobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";

const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobModel>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async (id: string) => setJob(await jobsService.getJob(id));
    if (id && Number(id)) {
      fetchJob(id);
    } else {
      navigate("/jobs");
    }
  }, [id, navigate]);

  const  goToCreateJobPage = () => {
    navigate(`/job/edit/${job?.id}`);
  };

  return (
    <Page title={`${job?.name} részletes reírás`}>
      <AccessController allowedFor={["User"]}>
      <div className="row">
          <div className="col-3 col-sm-4 col-md-2 col-lg-1">
            <Button className="w-100 mb-3" onClick={goToCreateJobPage}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        </div>
      </AccessController>
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
