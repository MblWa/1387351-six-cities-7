import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Card from './card';
import { capitalize, calculateRatingPercent } from '../../util';
import { testOffers } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const mockStore = configureStore({});

describe('Component: Card', () => {
  it('should render correctly', () => {
    const [offer] = testOffers;
    const state = {};

    const {getByText} = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <Card
            offer={offer}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const priceCurrenctElement = getByText(/€/i);
    expect(priceCurrenctElement).toBeInTheDocument();

    const priceValueRegex = new RegExp(offer.price.toString(),'i');
    const priceValueElement = getByText(priceValueRegex);
    expect(priceValueElement).toBeInTheDocument();

    const previewImageElement = screen.getByRole('img');
    expect(previewImageElement).toHaveAttribute('src', `${offer.previewImage}`);
    expect(previewImageElement).toHaveAttribute('alt', 'Place to rent');

    const titleElement = getByText(`${offer.title}`);
    expect(titleElement).toBeInTheDocument();

    const titleType = getByText(capitalize(offer.type));
    expect(titleType).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveStyle(`width: ${calculateRatingPercent(offer.rating)}`);
  });

  it('should redirect to room when user clicks an image or title', () => {
    const [offer] = testOffers;
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
            <Card
              offer={offer}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is room page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('image-offer-link'));
    expect(screen.queryByText(/This is room page/i)).toBeInTheDocument();
    history.push('/fake');
    userEvent.click(screen.getByTestId('title-offer-link'));
    expect(screen.queryByText(/This is room page/i)).toBeInTheDocument();
  });

  it('should render isFavorite and isPremium', () => {
    const [offer] = testOffers;
    offer.isFavorite = true;
    offer.isPremium = true;
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <BrowserRouter>
        <Route>
          <Card
            offer={offer}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </Route>
      </BrowserRouter>);

    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByTestId('premium')).toHaveClass('place-card__mark');
    userEvent.click(screen.getByTestId('add-to-favorites'));
    expect(dispatch).toBeCalled();
  });

  it('should user hover Card', () => {
    const [offer] = testOffers;
    const hoverHandler = jest.fn();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <BrowserRouter>
        <Card
          offer={offer}
          onMouseEnter={hoverHandler}
          onMouseLeave={hoverHandler}
        />
      </BrowserRouter>);

    userEvent.hover(screen.getByRole('article'));
    expect(hoverHandler).toBeCalled();
    expect(hoverHandler).toBeCalledWith(offer.id);

    userEvent.unhover(screen.getByRole('article'));
    expect(hoverHandler).toBeCalled();
  });
});
