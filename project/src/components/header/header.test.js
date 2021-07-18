import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch, Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from './header';
import { testAuthUser } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const mockStore = configureStore({});
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const state = {
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('src', 'img/logo.svg');
    expect(logoElement).toHaveAttribute('alt', '6 cities logo');
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    const state = {
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('logo-link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
