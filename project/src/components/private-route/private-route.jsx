import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthorizationStatus } from '../../const';


function PrivateRoute({render, path, exact, authorizationStatus, isPublic, redirectRoute}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => (
        (authorizationStatus === AuthorizationStatus.AUTH ? isPublic : !isPublic)
          ? <Redirect to={redirectRoute} />
          : render(routeProps))}
    />
  );
}

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isPublic: PropTypes.bool,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  isPublic: false,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});


export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
