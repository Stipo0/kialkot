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

interface ChatBodyProps {
  jobId: number;
}

const ChatBody = ({ jobId }: ChatBodyProps) => {
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

    fetchMessages(Number(jobId ? jobId : 0));
  }, [jobId]);

  const initialValues: ChatSendMessagesModel = {
    message: "",
  };

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    message: Yup.string().required(kotelezo),
  });

  const handleAddMessage = async (value: ChatSendMessagesModel) => {
    try {
      setMessages(await chatService.sendMessage(value, jobId));
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  return (
    <div className="panel panel-default">
      <div className="panel-body panel-chat card p-2">
        <div>
          {messages.map((message) => (
            <>
              <div
                className={classNames(
                  "ms-2 col-sm-6 me-e mb-2 card p-2 masseges",
                  {
                    newMessage: message.newMessage,
                  },
                  { ownMessages: message.userId === Number(userId) }
                )}
                onClick={() => (message.newMessage = false)}
              >
                <section key={message.id}>
                  <i>
                    <u>{message.userNickName}:</u>{" "}
                  </i>
                  <b>
                    {message.message} {message.userId}
                  </b>
                </section>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="panel-footer card p-1 mt-2">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleAddMessage}
          validateOnMount
          validateOnChange
        >
          <Form className="row">
            <TextField label="Üzenet" name="message" className="col-9 ms-1" />
            <Button className="col-2 mt-2" type="submit">
              Küld!
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatBody;
