import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Room from '../room/room';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import { getOffersLoadedStatus } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { isCheckedAuth } from '../../util';

function App() {
  const { ROOT, ROOM, LOGIN, FAVORITES, NOT_FOUND } = AppRoute;
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isOffersLoaded = useSelector(getOffersLoadedStatus);

  if (isCheckedAuth(authorizationStatus) || !isOffersLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
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
  );
}

export default App;
