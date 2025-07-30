import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider, ErrorBoundary } from '@rollbar/react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import ChatPage from './ChatPage.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'
import Navbar from './Navbar.jsx'
import PageNotFound from './PageNotFound.jsx'
import getModal from './modals/index.js'
import { logIn, setInitialized } from '../slices/authSlice.js'

const rollbarConfig = {
  accessToken: 'b247b6c89b464b52b9415ec96624e8a3',
  environment: 'testenv',
}

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn)
  return loggedIn ? children : <Navigate to="/login" />
}

const renderModal = (modalType) => {
  if (!modalType) {
    return null
  }

  const Component = getModal(modalType)
  return <Component />
}

const App = () => {
  const dispatch = useDispatch()
  const initialized = useSelector(state => state.auth.initialized)
  const modalType = useSelector(state => state.modal.type)
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'))

    if (userId && userId.token) {
      dispatch(logIn(userId.username))
    }
 else {
      dispatch(setInitialized())
    }
  }, [dispatch])

  return (
    initialized && (
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <Router>
            <div className="h-100">
              <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                  <Navbar />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <ChatPage />
                        </PrivateRoute>
                      }
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </div>
                <ToastContainer />
              </div>
            </div>
            {renderModal(modalType)}
          </Router>
        </ErrorBoundary>
      </Provider>
    )
  )
}

export default App
