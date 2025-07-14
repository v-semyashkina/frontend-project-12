import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setActiveChannel } from '../slices/channelsSlice.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const activeChannelId = useSelector((state) => {
    return state.channels.activeId;
  });
  const channelClass = cn('w-100 rounded-0 text-start btn', {
    'btn-secondary': channel.id === activeChannelId,
  });

  return (
    <li className="nav-item w-100">
      <button
        type="button"
        className={channelClass}
        onClick={() => dispatch(setActiveChannel(channel.id))}
      >
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
