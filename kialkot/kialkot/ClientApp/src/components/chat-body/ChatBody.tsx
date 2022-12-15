import classNames from "classnames";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import TextField from "../text-field/TextField";

import {
  ChatMessagesModel,
  ChatSendMessagesModel,
} from "../../models/chat.models";

import { chatService } from "../../service/chat.service";

import { HanleCatch } from "../../util/handleCatch";
import { getDataFromTokenModel } from "../../util/token";
import Button from "../button/Button";
import moment from "moment";

interface ChatBodyProps {
  jobId: number;
  changeJobId: boolean;
  setChangeJobId: (changeJobId: boolean) => void;
}

const ChatBody = ({ jobId, changeJobId, setChangeJobId }: ChatBodyProps) => {
  const [messages, setMessages] = useState<ChatMessagesModel[]>([]);
  const userId = getDataFromTokenModel("userId");

  useEffect(() => {
    const fetchMessages = async (jobId: number) => {
      try {
        setMessages(await chatService.getMessages(jobId));
      } catch (e) {
        alert(HanleCatch(e));
      }
    };

    const fetch = () => {
      jobId !== 0 && fetchMessages(Number(jobId));
    };

    changeJobId
      ? fetch()
      : setTimeout(() => {
          fetch();
        }, 10000);
    setChangeJobId(false);
  });

  const initialValues: ChatSendMessagesModel = {
    message: "",
  };

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    message: Yup.string().required(kotelezo),
  });

  const handleAddMessage = async (value: ChatSendMessagesModel) => {
    try {
      const data = await chatService.sendMessage(value, jobId);
      messages.push(data);
      setMessages(messages);
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  return (
    <div className="panel panel-default">
      <div className="panel-body panel-chat card p-2">
        <div>
          {messages.length ? (
            messages.map((message) => (
              <>
                <div
                  className={classNames(
                    "ms-2 col-sm-7 me-e mb-2 card shadow-sm p-2 messages",
                    {
                      newMessage: message.newMessage,
                    },
                    { ownMessages: message.userId === Number(userId) }
                  )}
                  onClick={() => (message.newMessage = false)}
                >
                  <section key={message.id}>
                    <small className="ms-5">{message.userNickName}</small>
                    <b>{message.message}</b>
                    <br />
                    <small>
                      {moment(message.sendAt).format("YYYY-MM-DD HH:mm:ss")}
                    </small>
                  </section>
                </div>
              </>
            ))
          ) : (
            <h1>Válassz vagy üzenj!!</h1>
          )}
        </div>
      </div>
      <div className="panel-footer card p-1 mt-2">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleAddMessage}
          enableReinitialize
          validateOnMount
          validateOnChange
        >
          <Form className="row">
            <TextField label="Üzenet" name="message" className="col-8 ms-1" />
            <Button className="col-3 mt-2" type="submit">
              Küld!
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatBody;
