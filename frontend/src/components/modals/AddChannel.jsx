import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Form, Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { sendChannel } from '../../slices/channelsApi.js';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';

const AddChannel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();
  const [addNewChannel, { isLoading }] = sendChannel();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const existingChannelsNames = useSelector(channelsSelectors.selectAll).map(
    (channel) => channel.name,
  );

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
      const newChannel = { name };
      try {
        await addNewChannel(newChannel).unwrap();
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
          <Modal.Title>{t('modals.addTitle')}</Modal.Title>
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
                className={`mb-2 ${
                  formik.submitCount > 0 && formik.errors.name ? 'is-invalid' : ''
                }`}
                data-testid="input-body"
                name="name"
                id="name"
              />
              <Form.Label htmlFor="name" className="visually-hidden">
                {t('modals.addLabel')}
              </Form.Label>
              {formik.submitCount > 0 && formik.errors.name && (
                <Form.Control.Feedback className="invalid-feedback">
                  {formik.errors.name}
                </Form.Control.Feedback>
              )}
              <div className="d-flex justify-content-end">
                <Button
                  type="button"
                  variant="secondary"
                  className="me-2"
                  onClick={() => dispatch(closeModal())}
                  disabled={isLoading}
                >
                  {t('modals.addBtns.cancel')}
                </Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {t('modals.addBtns.submit')}
                </Button>
              </div>
            </Form.Group>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddChannel;
