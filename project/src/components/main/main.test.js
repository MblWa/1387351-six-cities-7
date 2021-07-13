import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import Main from './main';
import { testOffers, testAuthUser, testCity } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: Main', () => {
  it('should render correctly', () => {

    const state = {
      DATA: {
        offers: testOffers,
      },
      UI: {
        city: testCity,
        sortBy: 'Popular',
      },
      USER: testAuthUser,
    };

    const { getByRole } = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>,
    );

    const mainElement = getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
