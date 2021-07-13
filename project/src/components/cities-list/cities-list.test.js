import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import CitiesList from './cities-list';
import { CITIES_LIST } from '../../const';
import { capitalize } from '../../util';
import { testOffers, testCity } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const state = {
      DATA: { offers: testOffers },
      UI: { city: testCity },
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <CitiesList />
        </BrowserRouter>
      </Provider>,
    );

    Object.keys(CITIES_LIST).forEach((cityName) => {
      const linkElement = screen.getByText(capitalize(cityName));
      expect(linkElement).toBeInTheDocument();
    });

    const mapElement = screen.getByTestId('map');
    expect(mapElement).toBeInTheDocument();


  });
});
