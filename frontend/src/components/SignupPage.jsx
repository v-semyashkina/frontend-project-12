import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { logIn } from '../slices/authSlice.js'
import { useSignupMutation } from '../slices/usersApi.js'
import avatar from '../assets/avatar_1-D7Cot-zE.jpg'

const SignupPage = () => {
  const { t } = useTranslation()
  const [signupFailed, setSignupFailed] = useState(false)
  const inputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signupUser] = useSignupMutation()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('signupPage.usernamePlaceholder'))
        .max(20, t('signupPage.usernamePlaceholder'))
        .required(t('signupPage.required')),
      password: Yup.string()
        .required(t('signupPage.required'))
        .min(6, t('signupPage.passwordPlaceholder')),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        t('signupPage.confirmPasswordPlaceholder'),
      ),
    }),
    onSubmit: async ({ username, password }) => {
      const newUser = { username, password }
      try {
        const response = await signupUser(newUser).unwrap()
        localStorage.setItem('userId', JSON.stringify(response))
        dispatch(logIn(response.username))
        navigate('/')
      }
      catch (error) {
        formik.setSubmitting(false)
        if (error.status === 409) {
          setSignupFailed(true)
        }
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('networkError'))
        }
      }
    },
  })

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt={t('signupPage.imgAlt')}></img>
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('signupPage.usernamePlaceholder')}
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    ref={inputRef}
                    isInvalid={(formik.submitCount > 0 && formik.errors.username) || signupFailed}
                  >
                  </Form.Control>
                  <Form.Label htmlFor="username">{t('signupPage.usernameLabel')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('signupPage.passwordPlaceholder')}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    isInvalid={(formik.submitCount > 0 && formik.errors.password) || signupFailed}
                  >
                  </Form.Control>
                  <Form.Label htmlFor="password">{t('signupPage.passwordLabel')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder={t('signupPage.confirmPasswordPlaceholder')}
                    name="confirmPassword"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    isInvalid={
                      (formik.submitCount > 0 && formik.errors.confirmPassword) || signupFailed
                    }
                  >
                  </Form.Control>
                  <Form.Label htmlFor="confirmPassword">
                    {t('signupPage.confirmPasswordLabel')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : t('signupPage.signupError')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                  {t('signupPage.signupBtn')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
