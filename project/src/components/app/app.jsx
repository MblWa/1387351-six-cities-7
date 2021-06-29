import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Room from '../room/room';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { isCheckedAuth } from '../../util';

function App({ authorizationStatus, isOffersLoaded }) {
  const { ROOT, ROOM, LOGIN, FAVORITES, NOT_FOUND } = AppRoute;

  if (isCheckedAuth(authorizationStatus) || !isOffersLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROOT}>
          <Main />
        </Route>
        <Route exact path={ROOM}>
          <Room />
        </Route>
        <Route
          exact
          path={LOGIN}
          render={() => (
            (authorizationStatus === AuthorizationStatus.AUTH)
              ? <Redirect to={ROOT} />
              : <SignIn />)}
        />
        <PrivateRoute
          exact
          path={FAVORITES}
          redirectRoute={LOGIN}
          render={() => <Favorites />}
        />
        <Route path={NOT_FOUND}>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isOffersLoaded: state.isOffersLoaded,
});

export { App };
export default connect(mapStateToProps, null)(App);
