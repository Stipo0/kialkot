import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import AccessController from "../../components/access-controller/AccessController";
import ActionButton from "../../components/action-button/ActionButton";
import Page from "../../components/page/Page";
import UploadImage from "../../components/upload-image/UploadImage";

import { ChangeJobStatusModel, JobModel } from "../../models/job.model";

import { jobsService } from "../../service/job.service";

import { HanleCatch } from "../../util/handleCatch";
import { getDataFromTokenModel } from "../../util/token";

import "./JobPage.scss";
import { JobStatusEnum } from "../../enums/job.status.enum";
import DeleteCheck from "../../components/delete-check/DeleteCheck";

const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobModel>();
  const [isShownImageAdd, setIsShownImageAdd] = useState(false);
  const [isShowDeleteCheck, setIsShowDeleteCheck] = useState(false);
  const userId = getDataFromTokenModel("userId");
  const navigate = useNavigate();
  const designerWorkOnThisJob = Number(userId) === Number(job?.worker?.id);

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

  const handleAddImageClick = () => {
    setIsShownImageAdd((current) => !current);
  };

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

  const goToEditJobPage = () => {
    navigate(`/job/edit/${job?.id}`);
  };

  const handleFinish = async () => {
    try {
      const data: ChangeJobStatusModel = {
        status: JobStatusEnum.Finished,
        image: job?.image,
      };
      setJob(await jobsService.changeStatus(data, job?.id as number));
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  return (
    <>
      <div className="me-3">
        <AccessController allowedFor={["User", "Admin"]}>
          <ActionButton onClick={goToEditJobPage}>
            <FontAwesomeIcon icon={faEdit} />
          </ActionButton>
          <ActionButton
            color="danger"
            onClick={() => setIsShowDeleteCheck(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </ActionButton>
        </AccessController>
        <AccessController allowedFor={["Designer"]}>
          {Number(userId) === Number(job?.worker?.id) ? (
            <ActionButton onClick={rejectJob} color="secondary">
              Munka leadása
            </ActionButton>
          ) : (
            <ActionButton onClick={acceptJob}>Munka felvétele</ActionButton>
          )}
        </AccessController>
      </div>
      <Page className="pt-3" title={`${job?.name} részletes reírás`}>
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
          {job?.image && (
            <>
              <hr className="Green" />
              <h5>Mellékletek:</h5>
              <img
                className="mb-3"
                src={`${job?.image}`}
                alt={job?.name}
                width="50%"
              />
            </>
          )}
          <br />
          <AccessController allowedFor={["Designer"]}>
            {designerWorkOnThisJob && (
              <>
                {isShownImageAdd && (
                  <UploadImage jobId={job?.id as number} setJob={setJob} />
                )}
                <ActionButton onClick={handleAddImageClick}>
                  Melléklet cseréje
                </ActionButton>
                {JobStatusEnum[job?.jobStatus as JobStatusEnum].toString() ===
                  JobStatusEnum.InProgress.toString() && (
                    <ActionButton onClick={handleFinish}>Befejezés</ActionButton>
                )}
              </>
            )}
          </AccessController>
          <h5 className="d-inline">Állapot: </h5>
          <p className="d-inline">{job?.jobStatus}</p>
        </div>
      </Page>
      {isShowDeleteCheck && (
        <DeleteCheck
          handle={deleteJob}
          title="munkát"
          isShow={setIsShowDeleteCheck}
        />
      )}
    </>
  );
};

export default JobPage;
