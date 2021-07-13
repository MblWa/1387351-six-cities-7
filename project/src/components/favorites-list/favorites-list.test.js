import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import FavoritesList from './favorites-list';
import { testOffers, testCity } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const state = {};

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <FavoritesList city={testCity.name} offers={testOffers}/>
        </BrowserRouter>
      </Provider>,
    );

    const cityElement = screen.getByText(`${testCity.name}`);
    expect(cityElement).toBeInTheDocument();

    const cardElement = screen.getByRole('article');
    expect(cardElement).toBeInTheDocument();
  });
});
