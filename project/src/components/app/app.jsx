import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Room from '../room/room';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../const';

function App({ cardsCount }) {
  const { ROOT, ROOM, LOGIN, FAVORITES } = AppRoute;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROOT}>
          <Main cardsCount={cardsCount}/>
        </Route>
        <Route exact path={ROOM} component={Room} />
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
  cardsCount: PropTypes.number.isRequired,
};

export default App;
