import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';
import { PageOne } from './Components/Pages.jsx';
import LoginPage from './Components/LoginPage.jsx';
import Navbar from './Components/Navbar.jsx';
import PageNotFound from './Components/PageNotFound.jsx';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
