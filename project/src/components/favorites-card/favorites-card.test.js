import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritesCard from './favorites-card';
import { capitalize } from '../../util';
import { testOffers } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const mockStore = configureStore({});
const [ offer ] = testOffers;
describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    const state = {};

    const {getByText} = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <FavoritesCard
            offer={offer}
          />
        </BrowserRouter>
      </Provider>,
    );

    const previewImageElement = screen.getByRole('img');
    expect(previewImageElement).toHaveAttribute('src', `${offer.previewImage}`);
    expect(previewImageElement).toHaveAttribute('alt', 'Place to rent');

    const favoriteButtonElement = screen.getByRole('button');
    expect(favoriteButtonElement).toHaveAttribute('class', 'place-card__bookmark-button place-card__bookmark-button--active button');

    const priceCurrenctElement = getByText(/€/i);
    expect(priceCurrenctElement).toBeInTheDocument();

    const priceValueRegex = new RegExp(offer.price.toString(),'i');
    const priceValueElement = getByText(priceValueRegex);
    expect(priceValueElement).toBeInTheDocument();

    const titleElement = getByText(`${offer.title}`);
    expect(titleElement).toBeInTheDocument();

    const ratingElement = getByText(capitalize('Rating'));
    expect(ratingElement).toBeInTheDocument();
  });

  it('should redirect to room when user clicks an image', () => {
    const history = createMemoryHistory();
    history.push('/fake');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.ROOM + offer.id} exact>
            <h1>This is room page</h1>
          </Route>
          <Route>
            <FavoritesCard offer={offer}/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is room page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('image-offer-link'));
    expect(screen.queryByText(/This is room page/i)).toBeInTheDocument();
  });

  it('should redirect to room when user clicks a title', () => {
    const history = createMemoryHistory();
    history.push('/fake');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.ROOM + offer.id} exact>
            <h1>This is room page</h1>
          </Route>
          <Route>
            <FavoritesCard offer={offer}/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is room page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('title-offer-link'));
    expect(screen.queryByText(/This is room page/i)).toBeInTheDocument();
  });

  it('should redirect to room and dispatch an event to change current city', () => {
    const history = createMemoryHistory();
    history.push('/fake');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Router history={history}>
        <FavoritesCard offer={offer}/>
      </Router>);

    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
