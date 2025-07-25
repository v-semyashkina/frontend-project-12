import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { renameChannel } from '../../slices/channelsApi.js';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';

const RenameChannel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();
  const [sendNewName, { isLoading }] = renameChannel();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const existingChannelsNames = useSelector(channelsSelectors.selectAll).map(
    (channel) => channel.name,
  );
  const modalItem = useSelector((state) => state.modal.item);

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
      const id = modalItem.id;
      try {
        await sendNewName({ id, name }).unwrap();
        dispatch(closeModal());
      } catch (error) {
        console.error(error);
      }
    },
  });

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
          <Modal.Title>{t('modals.renameTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                isInvalid={formik.submitCount > 0 && formik.errors.name}
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RenameChannel;
