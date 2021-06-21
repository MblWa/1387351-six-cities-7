import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Room from '../room/room';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../const';
import { reviewProp, offerProp } from '../../prop-types/props';

function App({ offers, reviews }) {
  const { ROOT, ROOM, LOGIN, FAVORITES } = AppRoute;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROOT}>
          <Main />
        </Route>
        <Route exact path={ROOM}>
          <Room offers={offers} reviews={reviews} />
        </Route>
        <Route exact path={LOGIN}>
          <SignIn />
        </Route>
        <Route exact path={FAVORITES}>
          <Favorites offers={offers} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

export default App;
