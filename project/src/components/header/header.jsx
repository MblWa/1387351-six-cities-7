import React from 'react';
import { Link } from 'react-router-dom';
import UserStatusbar from '../user-statusbar/user-statusbar';
import { AppRoute } from '../../const';

function Header() {
  const { ROOT } = AppRoute;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={ROOT}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <UserStatusbar />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
