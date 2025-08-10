import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { removeChannel } from '../../slices/channelsApi.js'
import { deleteMessages } from '../../slices/messagesSlice.js'
import { closeModal } from '../../slices/modalsSlice.js'
import ModalForm from './ModalForm.jsx'

const ModalWindow = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [deleteChannel, { isLoading }] = removeChannel()
  const modalItem = useSelector(state => state.modal.item)
  const modalType = useSelector(state => state.modal.type)

  const handleDelete = async () => {
    const id = modalItem.id
    try {
      await deleteChannel(id).unwrap()
      dispatch(deleteMessages(id))
      dispatch(closeModal())
      toast.success(t(`modals.successMessage.${modalType}`))
    }
    catch (error) {
      console.log(error)
      if (error.status === 'FETCH_ERROR') {
        toast.error(t('networkError'))
      }
    }
  }

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show
        onHide={() => dispatch(closeModal())}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t(`modals.titles.${modalType}`)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'deletingChannel'
            ? (
                <>
                  <p className="lead">{t('modals.deleteQuestion')}</p>
                  <div className="d-flex justify-content-end">
                    <Button
                      type="button"
                      className="me-2"
                      onClick={() => dispatch(closeModal())}
                      variant="secondary"
                      disabled={isLoading}
                    >
                      {t('modals.deleteBtns.cancel')}
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDelete()}
                      disabled={isLoading}
                    >
                      {t('modals.deleteBtns.delete')}
                    </Button>
                  </div>
                </>
              )
            : (
                <ModalForm />
              )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalWindow
