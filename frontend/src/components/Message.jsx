const Message = ({ message, isLast, bottomRef }) => {
  return (
    <div className="text-break mb-2" ref={isLast ? bottomRef : null}>
      <b>{message.username}</b>
      :
      {message.body}
    </div>
  )
}

export default Message
