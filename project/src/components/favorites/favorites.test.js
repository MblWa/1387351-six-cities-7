import React from 'react';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Favorites from './favorites';
import { testOffers, testAuthUser } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const history = createMemoryHistory();
const mockStore = configureStore({});

describe('Component: Favorites', () => {
  it('should render loading screen if favorites are loading', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const state = {
      DATA: {
        favorites: [],
        isFavoritesLoaded: false,
      },
      USER: testAuthUser,
    };

    const { getByText } = render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    const loadingStatus = getByText('Loading...');
    expect(loadingStatus).toBeInTheDocument();
  });

  it('should render correctly if there is no fav offers', () => {
    const state = {
      DATA: {
        favorites: [],
        isFavoritesLoaded: true,
      },
      USER: testAuthUser,
    };

    const { getByText } = render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    const emptyListElement = getByText('Nothing yet saved.');

    expect(emptyListElement).toBeInTheDocument();
  });

  it('should render correctly if there is fav offers', () => {
    const state = {
      DATA: {
        favorites: testOffers,
        isFavoritesLoaded: true,
      },
      USER: testAuthUser,
    };

    const { getByText, getAllByRole } = render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    const offerElements = getAllByRole('article');
    const headingElement = getByText('Saved listing');

    expect(headingElement).toBeInTheDocument();
    expect(offerElements).toHaveLength(testOffers.length);
  });

  it('should try to fetch favorites from server if there were no fav loaded', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const state = {
      DATA: {
        favorites: [],
        isFavoritesLoaded: false,
      },
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(useDispatch).toBeCalledTimes(2);
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const state = {
      DATA: {
        favorites: [],
        isFavoritesLoaded: true,
      },
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <Favorites />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('footer-link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
