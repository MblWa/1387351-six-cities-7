import React from 'react';
import * as useMap from '../../hooks/use-map';
import { render, screen } from '@testing-library/react';
import Map from './map';
import { testOffers, testCity } from '../../test-mocks/test-mocks';

describe('Component: Map', () => {
  it('should render map correctly', () => {

    render(
      <Map city={testCity} offers={testOffers} selectedOffer={testOffers[0]} />,
    );

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('should render map with exact number of offers pins on the map', () => {
    const useMapFake = jest.spyOn(useMap, 'default');

    render(
      <Map city={testCity} offers={testOffers} selectedOffer={testOffers[0]} />,
    );

    const mapRef = screen.getByTestId('map-container');
    expect(mapRef.childNodes[0].childNodes[3].children).toHaveLength(testOffers.length);
    expect(useMapFake).toBeCalled();
    expect(useMapFake).toBeCalledWith({ current: mapRef }, testCity);
  });
});
