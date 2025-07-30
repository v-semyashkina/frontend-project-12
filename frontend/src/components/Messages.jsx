import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { socket } from '../socket.js'
import Message from './Message.jsx'
import MessageForm from './MessageForm.jsx'
import { addMessage, messagesSelectors } from '../slices/messagesSlice.js'
import { selectActiveChannel } from '../slices/channelsSlice.js'

const Messages = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload))
    })
  }, [])

  const activeChannel = useSelector(selectActiveChannel)
  const activeChannelId = activeChannel?.id || null
  const activeChannelName = activeChannel?.name || ''

  const messages = useSelector(messagesSelectors.selectAll).filter(
    message => message.channelId === activeChannelId,
  )
  const messagesCount = messages.length

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannelName}
            </b>
          </p>
          <span className="text-muted">
            {messagesCount}
            {' '}
            {t('messages', { count: messagesCount })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm messages={messages} />
        </div>
      </div>
    </div>
  )
}

export default Messages
