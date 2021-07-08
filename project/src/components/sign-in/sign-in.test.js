import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './sign-in';
import { AuthorizationStatus } from '../../const';

const mockStore = configureStore({});

describe('Component: SignIn', () => {
  it('should render correctly', () => {
    const city = {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    };

    const state = {
      UI: { city },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {
          email: '',
          loginError: '',
        },
      },
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

    const cityNameElement = screen.getByText(city.name);
    expect(cityNameElement).toBeInTheDocument();

    const loginElement = screen.getByTestId('login');
    expect(loginElement).toBeInTheDocument();
    const passwordElement = screen.getByTestId('password');
    expect(passwordElement).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '1234567890');
    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
  });
});
