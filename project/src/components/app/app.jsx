import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Room from '../room/room';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import LoadingScreen from '../loading-screen/loading-screen';
import { AppRoute } from '../../const';
import { isCheckedAuth } from '../../util';
import { reviewProp } from '../../prop-types/props';

function App({ authorizationStatus, isOffersLoaded, reviews }) {
  const { ROOT, ROOM, LOGIN, FAVORITES } = AppRoute;

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
          <Room reviews={reviews} />
        </Route>
        <Route exact path={LOGIN}>
          <SignIn />
        </Route>
        <Route exact path={FAVORITES}>
          <Favorites />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isOffersLoaded: state.isOffersLoaded,
});

export {App};
export default connect(mapStateToProps, null)(App);
