import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SignIn from './sign-in';
import { testNotAuthUser, testCity } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const mockStore = configureStore({});
const history = createMemoryHistory();

describe('Component: SignIn', () => {
  it('should render correctly', () => {
    const state = {
      UI: { city: testCity },
      USER: testNotAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <SignIn />
        </BrowserRouter>
      </Provider>,
    );

    const signInButtonElement = screen.getByTestId('submit-button');
    expect(signInButtonElement).toBeInTheDocument();

    const cityNameElement = screen.getByText(testCity.name);
    expect(cityNameElement).toBeInTheDocument();

    const loginElement = screen.getByTestId('login');
    expect(loginElement).toBeInTheDocument();
    const passwordElement = screen.getByTestId('password');
    expect(passwordElement).toBeInTheDocument();

    userEvent.type(loginElement, 'test@test.ru');
    userEvent.type(passwordElement, '1234567890');
    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
  });

  it('should login user when user clicks on submit', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const state = {
      UI: { city: testCity },
      USER: testNotAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <SignIn />
        </BrowserRouter>
      </Provider>,
    );

    const signInButtonElement = screen.getByTestId('submit-button');
    userEvent.click(signInButtonElement);

    expect(useDispatch).toBeCalledTimes(2);
  });

  it('should redirect to root url when user clicked on current location link', () => {
    history.push('/fake');
    const state = {
      UI: { city: testCity },
      USER: testNotAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>This is root page</h1>
            </Route>
            <Route>
              <SignIn />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is root page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(testCity.name));
    expect(screen.queryByText(/This is root page/i)).toBeInTheDocument();
  });
});
