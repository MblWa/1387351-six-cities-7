import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';
import { AuthorizationStatus } from '../../const';

const mockStore = configureStore({});

describe('Component: Header', () => {
  it('should render correctly', () => {
    const state = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          email: 'test@test.ru',
          loginError: '',
        },
      },
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('src', 'img/logo.svg');
    expect(logoElement).toHaveAttribute('alt', '6 cities logo');
  });
});
