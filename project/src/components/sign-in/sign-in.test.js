import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './sign-in';
import { testNotAuthUser, testCity } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

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

    userEvent.type(screen.getByTestId('login'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '1234567890');
    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
  });
});
