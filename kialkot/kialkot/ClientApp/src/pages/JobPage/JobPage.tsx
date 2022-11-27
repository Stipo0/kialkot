import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AccessController from "../../components/access-controller/AccessController";
import Page from "../../components/page/Page";
import ActionButton from "../../components/action-button/ActionButton";

import { JobStatusEnum } from "../../enums/job.status.enum";

import { JobModel, SubscribeJobModel } from "../../models/job.model";

import { jobsService } from "../../service/job.service";

import { HanleCatch } from "../../util/handleCatch";

import "./JobPage.scss";
import moment from "moment";



const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobModel>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async (id: string) => {
      const data = await jobsService.getJob(id);
      if (data) setJob(data);
      else navigate("/jobs");
    };
    if (id) {
      fetchJob(id);
    }
  }, [id, navigate]);

  const subscribeJob = async () => {
    try {
      const values: SubscribeJobModel = {
        jobId: job?.id,
      };
      alert(await jobsService.subscribeJob(values));
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  const unSubscribeJob = async () => {
    try {
      const values: SubscribeJobModel = {
        jobId: job?.id,
      };
      alert(await jobsService.unSubscribeJob(values));
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  const goToCreateJobPage = () => {
    navigate(`/job/edit/${job?.id}`);
  };

  return (
    <>
      <AccessController allowedFor={["User"]}>
        <ActionButton onClick={goToCreateJobPage}>
          <FontAwesomeIcon icon={faEdit} />
        </ActionButton>
      </AccessController>
      <AccessController allowedFor={["Desinger"]}>
        {job?.jobStatus === JobStatusEnum.InProgress ? (
          <ActionButton onClick={unSubscribeJob} color="secondary">
            Munka leadása
          </ActionButton>
        ) : (
          <ActionButton onClick={subscribeJob}>Munka felvétele</ActionButton>
        )}
      </AccessController>
      <Page title={`${job?.name} részletes reírás`}>
        <div>
          <h6 className="d-inline">Név:</h6>
          <p className="d-inline p-2">{job?.creator.nickName}</p>
          <h6 className="d-inline fa-pull-right m-auto">határidő</h6>
          <br />
          <h6 className="d-inline">Email cím:</h6>
          <p className="d-inline p-2">{job?.creator.email}</p>
          <p className="d-inline fa-pull-right">{moment(job?.deadline).format('YYYY. MM DD.')}</p>
          <hr className="Orange" />
          <h4 className="m-auto">Feladat</h4>
          <h5 className="m-auto">{job?.jobType}</h5>
          <p>{job?.description}</p>
          <hr className="Green" />
          <h5>Mellékletek:</h5>
          <img className="mb-3" src={`${job?.image}`} alt={job?.name} width="50%" />
          <br />
          <h5 className="d-inline">Állapot: </h5>
          <p className="d-inline">{job?.jobStatus}</p>
        </div>
      </Page>
    </>
  );
};

export default JobPage;
