import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CitiesList from './cities-list';
import { capitalize } from '../../util';
import { testOffers, testCity } from '../../test-mocks/test-mocks';
import { AppRoute, CITIES_LIST } from '../../const';
import { ActionType } from '../../store/action';

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

    const listElement = screen.getByTestId('offers-list-container');
    expect(listElement).toHaveAttribute('class', 'cities__places-list places__list tabs__content');
  });

  it('should render correctly if no offers provided', () => {
    const state = {
      DATA: { offers: [] },
      UI: { city: testCity },
    };

    const { getByText } = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <CitiesList />
        </BrowserRouter>
      </Provider>,
    );

    const cityElement = getByText(`We could not find any property available at the moment in ${state.UI.city.name}`);
    expect(cityElement).toBeInTheDocument();
  });

  it('should redirect to root and dispatch an event to change current city', () => {
    const history = createMemoryHistory();
    history.push('/fake');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const state = {
      DATA: { offers: testOffers },
      UI: { city: testCity },
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <CitiesList />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    Object.values(CITIES_LIST).forEach((cityName, index) => {
      expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

      const linkElement = screen.getByTestId(cityName.name);
      userEvent.click(linkElement);

      expect(dispatch).nthCalledWith(index + 1, {
        type: ActionType.CHANGE_CITY,
        payload: cityName,
      });
      expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();

      history.push('/fake');
    });
  });
});
