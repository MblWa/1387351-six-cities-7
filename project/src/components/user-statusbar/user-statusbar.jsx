import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { logout } from '../../store/api-actions';

function UserStatusbar({ email, authorizationStatus, logoutUser }) {
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

UserStatusbar.propTypes = {
  email: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser() {
    dispatch(logout());
  },
});

export { UserStatusbar };
export default connect(mapStateToProps, mapDispatchToProps)(UserStatusbar);
