import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import { AppRoute } from '../../const';

function NotFound() {
  const { ROOT } = AppRoute;

  return (
    <div className="page">
      <Header />
      <div className="container" style={{textAlign: 'center'}}>
        <h1>404. Page not found</h1>
        <Link to={ROOT} style={{textDecoration: 'underline'}}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
