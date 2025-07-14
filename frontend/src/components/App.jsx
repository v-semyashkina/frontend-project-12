import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import Navbar from './Navbar.jsx';
import PageNotFound from './PageNotFound.jsx';
import { logIn, setInitialized } from '../slices/authSlice.js';

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return loggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      dispatch(logIn(userId));
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch]);

  return (
    initialized && (
      <Router>
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
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    )
  );
};

export default App;
