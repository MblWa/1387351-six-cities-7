import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritesList from './favorites-list';
import { testOffers, testCity } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';
import { ActionType } from '../../store/action';

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

  it('should redirect to root and dispatch an event to change current city', () => {
    const history = createMemoryHistory();
    history.push('/fake');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.ROOT} exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <FavoritesList city={testCity.name} offers={testOffers}/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('city-link'));
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.CHANGE_CITY,
      payload: testCity,
    });
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
