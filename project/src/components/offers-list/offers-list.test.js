import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import OffersList from './offers-list';
import { testOffers } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    const state = {};

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <OffersList
            className="cities__places-list places__list tabs__content"
            offers={testOffers}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const listElement = screen.getByTestId('offers-list-container');
    expect(listElement).toHaveAttribute('class', 'cities__places-list places__list tabs__content');

    const cardElement = screen.getByRole('article');
    expect(cardElement).toBeInTheDocument();
  });
});
