import { useState } from "react";
import ChatBody from "../../components/chat-body/ChatBody";
import ChatJobs from "../../components/chat-users/ChatUsers";
import Page from "../../components/page/Page";

import "./ChatPage.scss";

const ChatPage = () => {
  const [jobId, setJobId] = useState(0);
  const [jobName, setJobName] = useState("");
  const [changeJobId, setChangeJobId] = useState(true);

  return (
    <Page title={"Csevegés" + (jobName === "" ? "" : (` vele: ${jobName}`))} className="col-lg-8">
      <div className="row">
        <div className="col-sm-3 me-0">
          <ChatJobs
            setJobId={setJobId}
            setJobName={setJobName}
            setChangeJobId={setChangeJobId}
            changeJobId={changeJobId}
          />
        </div>
        <div className="col-sm-9 ms-0">
          <ChatBody
            jobId={jobId}
            setChangeJobId={setChangeJobId}
            changeJobId={changeJobId}
          />
        </div>
      </div>
    </Page>
  );
};

export default ChatPage;
