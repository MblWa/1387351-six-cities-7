import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Switch, Route, Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { AppRoute } from '../../const';
import Room from './room';
import { capitalize, calculateRatingPercent, selectPluralFormForNoun } from '../../util';
import { testOffers, testNotAuthUser } from '../../test-mocks/test-mocks';

let store = null;
const history = createMemoryHistory();
const createFakeStore = configureStore({});

describe('Application Routing', () => {
  it('should render loading screen if room is loading', () => {
    store = createFakeStore({
      USER: testNotAuthUser,
      DATA: {
        offersNearBy: [],
        room: [],
        isRoomLoaded: false,
        comments: [],
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Room />
        </Router>
      </Provider>,
    );

    const loadingStatus = screen.getByText('Loading...');
    expect(loadingStatus).toBeInTheDocument();
  });

  it('should try to load rooms data if not loaded', () => {
    store = createFakeStore({
      USER: testNotAuthUser,
      DATA: {
        offersNearBy: [],
        room: [],
        isRoomLoaded: false,
        comments: [],
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Room />
        </Router>
      </Provider>,
    );

    expect(useDispatch).toBeCalledTimes(1);
  });

  it('should render correctly', () => {
    const [offer] = testOffers;
    store = createFakeStore({
      USER: testNotAuthUser,
      DATA: {
        offersNearby: testOffers,
        room: offer,
        isRoomLoaded: true,
        comments: [],
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    history.push(AppRoute.ROOM + offer.id);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOM + offer.id} exact>
              <Room />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    const imageElements = screen.getAllByTestId('card-image');
    expect(imageElements).toHaveLength(offer.images.length);
    imageElements.forEach((image, index) => {
      expect(image).toHaveAttribute('src', `${offer.images[index]}`);
      expect(image).toHaveAttribute('alt', capitalize(offer.type));
    });
    expect(screen.getByTestId('rating')).toHaveStyle(`width: ${calculateRatingPercent(offer.rating)}`);

    const titleType = screen.getByTestId('room-type');
    expect(titleType).toBeInTheDocument();
    expect(titleType.textContent).toEqual(capitalize(offer.type));

    const bedroomsCountElement = screen.getByTestId('room-beds');
    expect(bedroomsCountElement).toBeInTheDocument();
    expect(bedroomsCountElement.textContent).toEqual(`${offer.bedrooms} ${selectPluralFormForNoun(offer.bedrooms, 'Bedroom', 'Bedrooms')}`);

    const adultsCountElement = screen.getByTestId('room-adults');
    expect(adultsCountElement).toBeInTheDocument();
    expect(adultsCountElement.textContent).toEqual(`Max ${offer.maxAdults} ${selectPluralFormForNoun(offer.maxAdults, 'adult', 'adults')}`);

    const priceElement = screen.getByTestId('room-price');
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.textContent).toEqual(`€${offer.price}`);

    const titleElement = screen.getByTestId('room-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toEqual(offer.title);

    const featureElements = screen.getAllByTestId('room-feature');
    expect(featureElements).toHaveLength(offer.goods.length);

    const hostAvatarElement = screen.getByTestId('host-avatar');
    expect(hostAvatarElement).toHaveAttribute('src', `${offer.host.avatarUrl}`);
    expect(hostAvatarElement).toHaveAttribute('alt', 'Host avatar');
  });

  it('should render correctly Premium and Favorite status of room, Pro status of host', () => {
    const [offer] = testOffers;
    offer.isFavorite = true;
    offer.isPremium = true;
    offer.host.isPro = true;

    store = createFakeStore({
      USER: testNotAuthUser,
      DATA: {
        offersNearby: testOffers,
        room: offer,
        isRoomLoaded: true,
        comments: [],
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    history.push(AppRoute.ROOM + offer.id);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOM + offer.id} exact>
              <Room />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('bookmark-button')).toHaveClass('property__bookmark-button--active');
    expect(screen.getByTestId('room-premium')).toHaveClass('property__mark');
    expect(screen.getByTestId('host-pro')).toHaveClass('property__user-status');
    userEvent.click(screen.getByTestId('bookmark-button'));
    expect(dispatch).toBeCalled();
  });
});
