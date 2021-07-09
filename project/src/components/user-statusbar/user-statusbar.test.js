import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserStatusbar from './user-statusbar';
import { AuthorizationStatus } from '../../const';

const mockStore = configureStore({});

describe('Component: UserStatusbar', () => {
  it('should render correctly if AUTHORIZED', () => {
    const state = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          email: 'test@test.ru',
          loginError: '',
        },
      },
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
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {
          email: '',
          loginError: '',
        },
      },
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
});
