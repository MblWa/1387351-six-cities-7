import React from 'react';
import {Router, Route} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PrivateRoute from './private-route';
import { testAuthUser, testNotAuthUser } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const createMockStore = configureStore({});
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push(AppRoute.FAVORITES);
  });

  it('should render component for public route, when user not authorized', () => {
    const store = createMockStore({
      USER: testNotAuthUser,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.LOGIN}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => (<h1>Private Route</h1>)}
            redirectRoute={AppRoute.LOGIN}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = createMockStore({
      USER: testAuthUser,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.LOGIN}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => (<h1>Private Route</h1>)}
            redirectRoute={AppRoute.LOGIN}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
