import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes.js';
import getNormalized from '../utilities/getNormalized.js';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const headers = getAuthHeader();

      axios
        .all([
          axios.get(routes.channelsPath(), { headers }),
          axios.get(routes.messagesPath(), { headers }),
        ])
        .then(
          axios.spread((responseChannels, responseMessages) => {
            const channelsData = getNormalized(responseChannels.data);
            const messagesData = getNormalized(responseMessages.data);
            dispatch(setChannels(channelsData));
            dispatch(setMessages(messagesData));
          }),
        )
        .catch((error) => {
          console.log(error);
        });
    };

    fetchContent();
  }, []);

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
