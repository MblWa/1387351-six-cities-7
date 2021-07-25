import React from 'react';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import UserStatusbar from './user-statusbar';
import { testAuthUser, testNotAuthUser } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const mockStore = configureStore({});
const history = createMemoryHistory();

describe('Component: UserStatusbar', () => {
  it('should render correctly if AUTHORIZED', () => {
    const state = {
      USER: testAuthUser,
    };

    const { getByText } = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <UserStatusbar />
        </BrowserRouter>
      </Provider>,
    );

    const emailLinkElement = getByText(`${state.USER.user.email}`);
    expect(emailLinkElement).toBeInTheDocument();

    const logoutLinkElement = getByText('Sign out');
    expect(logoutLinkElement).toBeInTheDocument();
  });

  it('should render correctly if UNAUTHORIZED', () => {
    const state = {
      USER: testNotAuthUser,
    };

    const { getByText } = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <UserStatusbar />
        </BrowserRouter>
      </Provider>,
    );

    const logoutLinkElement = getByText('Sign in');
    expect(logoutLinkElement).toBeInTheDocument();
  });

  it('should redirect to login url when user clicked on sign in link', () => {
    history.push('/fake');
    const state = {
      USER: testNotAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.LOGIN} exact>
              <h1>This is login page</h1>
            </Route>
            <Route>
              <UserStatusbar />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText('Sign in'));
    expect(screen.queryByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should redirect to fav url when user clicked on name link', () => {
    history.push('/fake');
    const state = {
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.FAVORITES} exact>
              <h1>This is fav page</h1>
            </Route>
            <Route>
              <UserStatusbar />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is fav page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(testAuthUser.user.email));
    expect(screen.queryByText(/This is fav page/i)).toBeInTheDocument();
  });

  it('should logout user when user clicked on log out link', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const state = {
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>This is root page</h1>
            </Route>
            <Route>
              <UserStatusbar />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    userEvent.click(screen.getByText('Sign out'));
    expect(useDispatch).toBeCalled();
    expect(screen.queryByText(/This is root page/i)).toBeInTheDocument();
  });
});
