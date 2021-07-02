import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { logout } from '../../store/api-actions';
import { getAuthorizationStatus, getUserEmail } from '../../store/user/selectors';

function UserStatusbar() {
  const email = useSelector(getUserEmail);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  const { ROOT, LOGIN, FAVORITES } = AppRoute;

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <>
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={FAVORITES} >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to={ROOT} onClick={logoutUser} >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </>
    );
  } else {
    return (
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={LOGIN} >
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    );
  }
}

export default UserStatusbar;
