// Render Prop
import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar-DIE1AEpS.jpg';
import LoginForm from './LoginForm.jsx';

const LoginPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={avatar} className="rounded-circle" alt="Войти"></img>
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
