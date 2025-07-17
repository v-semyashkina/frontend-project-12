import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logIn } from '../slices/authSlice.js';
import axios from 'axios';
import routes from '../routes.js';
import avatar from '../assets/avatar-DIE1AEpS.jpg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        dispatch(logIn(response.data.username));
        navigate('/');
      } catch (e) {
        formik.setSubmitting(false);
        if (e.isAxiosError && e.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw e;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt="Войти"></img>
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <fieldset>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('loginPage.usernamePlaceholder')}
                      id="uresname"
                      className="form-control"
                      isInvalid={authFailed}
                      ref={inputRef}
                    ></Form.Control>
                    <Form.Label htmlFor="username">{t('loginPage.usernamePlaceholder')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder={t('loginPage.passwordPlaceholder')}
                      type="password"
                      id="password"
                      className="form-control"
                      isInvalid={authFailed}
                    ></Form.Control>
                    <Form.Label className="form-label" htmlFor="password">
                      {t('loginPage.passwordPlaceholder')}
                    </Form.Label>
                    <Form.Control.Feedback className="invalid-tooltip">
                      {t('loginPage.error')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                    {t('loginPage.loginBtn')}
                  </Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.noAcc')}</span>{' '}
                <Link to="/signup">{t('loginPage.signupLink')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
