import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AppRoute, OFFER_PATH } from '../../const';
import App from './app';
import { testOffers, testNotAuthUser, testAuthUser, testCity } from '../../test-mocks/test-mocks';
import { calculateRatingPercent, capitalize, selectPluralFormForNoun } from '../../util';
let store = null;
let fakeApp = null;
const history = createMemoryHistory();
const createFakeStore = configureStore({});

describe('Application Routing', () => {
  beforeAll(() => {
    store = createFakeStore({
      USER: testNotAuthUser,
      DATA: {
        offers: testOffers,
        offersNearby: testOffers,
        isOffersLoaded: true,
        room: testOffers[0],
        favorites: [],
        isFavoritesLoaded: false,
        isRoomLoaded: true,
        comments: [],
      },
      UI: {
        city: testCity,
        sortBy: 'Popular',
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('redirects to ROOT when user navigate to "/"', () => {
    render(fakeApp);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('redirects to ROOM when user navigate to "ROOM/:id"', () => {
    history.push(OFFER_PATH + testOffers[0].id.toString());

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const imageElements = screen.getAllByTestId('card-image');
    expect(imageElements).toHaveLength(testOffers[0].images.length);
    imageElements.forEach((image, index) => {
      expect(image).toHaveAttribute('src', `${testOffers[0].images[index]}`);
      expect(image).toHaveAttribute('alt', capitalize(testOffers[0].type));
    });
    expect(screen.getByTestId('rating')).toHaveStyle(`width: ${calculateRatingPercent(testOffers[0].rating)}`);

    const titleType = screen.getByTestId('room-type');
    expect(titleType).toBeInTheDocument();
    expect(titleType.textContent).toEqual(capitalize(testOffers[0].type));

    const bedroomsCountElement = screen.getByTestId('room-beds');
    expect(bedroomsCountElement).toBeInTheDocument();
    expect(bedroomsCountElement.textContent).toEqual(`${testOffers[0].bedrooms} ${selectPluralFormForNoun(testOffers[0].bedrooms, 'Bedroom', 'Bedrooms')}`);

    const adultsCountElement = screen.getByTestId('room-adults');
    expect(adultsCountElement).toBeInTheDocument();
    expect(adultsCountElement.textContent).toEqual(`Max ${testOffers[0].maxAdults} ${selectPluralFormForNoun(testOffers[0].maxAdults, 'adult', 'adults')}`);

    const priceElement = screen.getByTestId('room-price');
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.textContent).toEqual(`€${testOffers[0].price}`);

    const titleElement = screen.getByTestId('room-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toEqual(testOffers[0].title);

    const featureElements = screen.getAllByTestId('room-feature');
    expect(featureElements).toHaveLength(testOffers[0].goods.length);

    const hostAvatarElement = screen.getByTestId('host-avatar');
    expect(hostAvatarElement).toHaveAttribute('src', `${testOffers[0].host.avatarUrl}`);
    expect(hostAvatarElement).toHaveAttribute('alt', 'Host avatar');
  });

  it('redirects to LOGIN when user navigate to "/login"', () => {
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    const signInButtonElement = screen.getByTestId('submit-button');
    expect(signInButtonElement).toBeInTheDocument();
    const loginElement = screen.getByTestId('login');
    expect(loginElement).toBeInTheDocument();
    const passwordElement = screen.getByTestId('password');
    expect(passwordElement).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '1234567890');
    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
  });

  it('redirects to NOT FOUND when user navigate to unexistent route', () => {
    history.push(AppRoute.NOT_FOUND);
    render(fakeApp);

    const linkElement = screen.getByText('Return to main page');
    expect(linkElement).toBeInTheDocument();
  });

  it('redirects to login when user navigate to sign in page while not authorized', () => {
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    const signInButtonElement = screen.getByTestId('submit-button');
    expect(signInButtonElement).toBeInTheDocument();

    const cityNameElement = screen.getByText(testCity.name);
    expect(cityNameElement).toBeInTheDocument();

    const loginElement = screen.getByTestId('login');
    expect(loginElement).toBeInTheDocument();
    const passwordElement = screen.getByTestId('password');
    expect(passwordElement).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '1234567890');
    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
  });

  it('redirects to root when user navigate to sign in page while authorized', () => {
    history.push(AppRoute.LOGIN);
    store = createFakeStore({
      USER: testAuthUser,
      DATA: {
        offers: testOffers,
        offersNearBy: testOffers,
        isOffersLoaded: true,
        room: testOffers[0],
        favorites: [],
        isFavoritesLoaded: false,
        isRoomLoaded: true,
        comments: [],
      },
      UI: {
        city: testCity,
        sortBy: 'Popular',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    const signInButtonElement = screen.queryByTestId('submit-button');
    expect(signInButtonElement).not.toBeInTheDocument();
  });
});
