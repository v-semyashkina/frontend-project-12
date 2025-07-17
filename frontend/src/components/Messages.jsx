import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { socket } from '../socket.js';
import Message from './Message.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import routes from '../routes.js';
import getAuthHeader from '../utilities/getAuthHeader.js';

const Messages = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();
  const formRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
  }, []);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }, { resetForm }) => {
      const newMessage = { body, channelId: activeChannelId, username };
      const headers = getAuthHeader();
      axios
        .post(routes.addMessagePath(), newMessage, { headers })
        .then(() => {
          resetForm({ body: '' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  const username = useSelector((state) => state.auth.username);

  const activeChannelId = useSelector((state) => state.channels.activeId);
  const channelsEntities = useSelector((state) => state.channels.entities);
  const activeChannelName = channelsEntities[activeChannelId]?.name || '';

  const messagesEntities = useSelector((state) => state.messages.entities);
  const messages = Object.values(messagesEntities).filter(
    (message) => message.channelId === activeChannelId,
  );
  const messagesCount = messages.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {activeChannelName}</b>
          </p>
          <span className="text-muted">
            {messagesCount} {t('messages', { count: messagesCount })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            onSubmit={formik.handleSubmit}
            noValidate=""
            className="py-1 border rounded-2"
            ref={formRef}
          >
            <Form.Group className="input-group has-validation">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.body}
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('messagePlaceholder')}
                className="border-0 p-0 ps-2 form-control"
                ref={inputRef}
              ></Form.Control>
              <Button
                type="submit"
                variant="outline-secondary"
                className="btn btn-group-vertical"
                disabled=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-right-square"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  ></path>
                </svg>
                <span className="visually-hidden">{t('messageBtnText')}</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
