import { useState } from "react";
import ChatBody from "../../components/chat-body/ChatBody";
import ChatJobs from "../../components/chat-users/ChatUsers";
import Page from "../../components/page/Page";

import "./ChatPage.scss";

const ChatPage = () => {
  const [jobId, setJobId] = useState(0);

  return (
    <Page title="Chat" className="col-lg-8">
      <div className="row">
        <div className="col-sm-3 me-0">
          <ChatJobs setJobId={setJobId} />
        </div>
        <div className="col-sm-9 ms-0">
          <ChatBody jobId={jobId}/>
        </div>
      </div>
    </Page>
  );
};

export default ChatPage;
