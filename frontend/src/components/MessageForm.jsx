import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { socket } from '../socket.js'
import { toast } from 'react-toastify'
import leoProfanity from '../utilities/leoProfanity.js'
import { addMessage } from '../slices/messagesSlice.js'
import { sendMessage } from '../slices/messagesApi.js'
import { selectActiveChannel } from '../slices/channelsSlice.js'

const MessageForm = ({ messages }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const inputRef = useRef()
  const formRef = useRef()
  const [sendNewMessage] = sendMessage()

  useEffect(() => {
    socket.on('newMessage', payload => {
      dispatch(addMessage(payload))
    })
  }, [])

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }, { resetForm }) => {
      const cleanBody = leoProfanity.clean(body)
      const newMessage = { body: cleanBody, channelId: activeChannelId, username }
      try {
        await sendNewMessage(newMessage).unwrap()
        resetForm({ body: '' })
      } catch (error) {
        console.log(error)
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('networkError'))
        }
      }
    },
  })

  const username = useSelector(state => state.auth.username)
  const activeChannel = useSelector(selectActiveChannel)
  const activeChannelId = activeChannel?.id || null

  useEffect(() => {
    inputRef.current?.focus()
  }, [messages])

  return (
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
  )
}

export default MessageForm
