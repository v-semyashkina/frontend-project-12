import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from '../slices/authSlice.js';

const Navbar = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {t('title')}
        </Link>
        {loggedIn ? (
          <Button variant="primary" onClick={() => dispatch(logOut())}>
            {t('logoutBtn')}
          </Button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
