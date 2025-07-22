import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import { getChannels } from '../slices/channelsApi.js';
import { getMessages } from '../slices/messagesApi.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();

  const { data: channels } = getChannels();
  const { data: messages } = getMessages();
  useEffect(() => {
    if (channels) {
      dispatch(setChannels(channels));
      dispatch(setActiveChannel(channels[0]));
    }
    if (messages) {
      dispatch(setMessages(messages));
    }
  }, [channels]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
