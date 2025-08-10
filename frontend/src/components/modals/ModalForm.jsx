import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import leoProfanity from '../../utilities/leoProfanity.js'
import { sendChannel } from '../../slices/channelsApi.js'
import { renameChannel } from '../../slices/channelsApi.js'
import { channelsSelectors, setActiveChannel } from '../../slices/channelsSlice.js'
import { closeModal } from '../../slices/modalsSlice.js'
import { logOut } from '../../slices/authSlice.js'

const ModalForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const inputRef = useRef()
  const modalType = useSelector(state => state.modal.type)
  const [addNewChannel] = sendChannel()
  const [sendNewName] = renameChannel()
  const [{ isLoading }] = modalType === 'addingChannel' ? sendChannel() : renameChannel()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  const existingChannelsNames = useSelector(channelsSelectors.selectAll).map(
    channel => channel.name,
  )
  const modalItem = useSelector(state => state.modal.item)

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('modals.addErrors.min'))
        .max(20, t('modals.addErrors.max'))
        .required(t('modals.addErrors.required'))
        .notOneOf(existingChannelsNames, t('modals.addErrors.repeats')),
    }),
    onSubmit: async ({ name }) => {
      const cleanName = leoProfanity.clean(name)
      const id = modalItem?.id
      try {
        const data
          = modalType === 'addingChannel'
            ? await addNewChannel({ name: cleanName }).unwrap()
            : await sendNewName({ id, name: cleanName }).unwrap()
        dispatch(closeModal())
        dispatch(setActiveChannel(data))
        toast.success(t('modals.addSuccessMessage'))
      }
      catch (error) {
        console.error(error)
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('networkError'))
        }
        if (error.status === 401) {
          localStorage.removeItem('userId')
          dispatch(logOut())
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Form.Group>
        <Form.Control
          required
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mb-2"
          data-testid="input-body"
          name="name"
          id="name"
          isInvalid={formik.submitCount > 0 && formik.errors.name && !isLoading}
          autoComplete="off"
        />
        <Form.Label htmlFor="name" className="visually-hidden">
          {t('modals.addLabel')}
        </Form.Label>
        <Form.Control.Feedback className="invalid-feedback">
          {formik.errors.name}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2"
            onClick={() => dispatch(closeModal())}
            variant="secondary"
            disabled={isLoading}
          >
            {t('modals.renameBtns.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {t('modals.renameBtns.submit')}
          </Button>
        </div>
      </Form.Group>
    </form>
  )
}

export default ModalForm
