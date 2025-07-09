import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageOne } from './Pages.jsx';
import LoginPage from './LoginPage.jsx';
import Navbar from './Navbar.jsx';
import PageNotFound from './PageNotFound.jsx';

//provider

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  // const location = useLocation();

  // return loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
  return loggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PageOne />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
