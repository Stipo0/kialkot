import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import AccessController from "../../components/access-controller/AccessController";
import Page from "../../components/page/Page";
import ActionButton from "../../components/action-button/ActionButton";

import { JobModel } from "../../models/job.model";

import { jobsService } from "../../service/job.service";

import { HanleCatch } from "../../util/handleCatch";
import { getDataFromTokenModel } from "../../util/token";

import "./JobPage.scss";

const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobModel>();
  const userId = getDataFromTokenModel("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async (id: string) => {
      try {
        const data = await jobsService.getJob(id);
        if (data) setJob(data);
        else navigate("/jobs");
      } catch (e) {
        alert(HanleCatch(e));
      }
    };
    if (id) {
      fetchJob(id);
    }
  }, [id, navigate]);

  const acceptJob = async () => {
    try {
      alert(await (await jobsService.acceptJob(job?.id as number)).ok);
      refreshPage();
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  const deleteJob = async () => {
    try {
      if (job) await jobsService.deleteJob(job?.id as number);
      navigate("jobs");
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  const rejectJob = async () => {
    try {
      alert(await (await jobsService.rejectJob(job?.id as number)).ok);
      refreshPage();
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  const refreshPage = () => {
    navigate(`job/${job?.id}`);
  };

  const goToCreateJobPage = () => {
    navigate(`/job/edit/${job?.id}`);
  };

  return (
    <>
      <AccessController allowedFor={["User"]}>
        {Number(userId) === Number(job?.creator?.id) && (
          <>
            <ActionButton onClick={goToCreateJobPage}>
              <FontAwesomeIcon icon={faEdit} />
            </ActionButton>
            <ActionButton color="danger" onClick={deleteJob}>
              <FontAwesomeIcon icon={faTrash} />
            </ActionButton>
          </>
        )}
      </AccessController>
      <AccessController allowedFor={["Desinger"]}>
        {Number(userId) === Number(job?.worker?.id) ? (
          <ActionButton onClick={rejectJob} color="secondary">
            Munka leadása
          </ActionButton>
        ) : (
          <ActionButton onClick={acceptJob}>Munka felvétele</ActionButton>
        )}
      </AccessController>
      <Page title={`${job?.name} részletes reírás`}>
        <div>
          <h6 className="d-inline">Név:</h6>
          <p className="d-inline p-2">{job?.creator?.nickName}</p>
          <h6 className="d-inline fa-pull-right m-auto">határidő</h6>
          <br />
          <h6 className="d-inline">Email cím:</h6>
          <p className="d-inline p-2">{job?.creator?.email}</p>
          <p className="d-inline fa-pull-right">
            {moment(job?.deadline).format("YYYY. MM DD.")}
          </p>
          <hr className="Orange" />
          <h4 className="m-auto">Feladat</h4>
          <h5 className="m-auto">{job?.jobType}</h5>
          <p className="description">{job?.description}</p>
          <hr className="Green" />
          <h5>Mellékletek:</h5>
          <img
            className="mb-3"
            src={`${job?.image}`}
            alt={job?.name}
            width="50%"
          />
          <br />
          <h5 className="d-inline">Állapot: </h5>
          <p className="d-inline">{job?.jobStatus}</p>
        </div>
      </Page>
    </>
  );
};

export default JobPage;
