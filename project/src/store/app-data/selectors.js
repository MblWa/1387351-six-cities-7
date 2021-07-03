import { createSelector } from 'reselect';
import { NameSpace } from '../root-reducer';
import { getCity, getSortBy } from '../ui-interaction/selectors';
import { SortByOptions } from '../../const';
import { arrangeOffersByCity } from '../../util';

const getOffers = (state) => state[NameSpace.DATA].offers;
export const getOffersLoadedStatus = (state) => state[NameSpace.DATA].isOffersLoaded;
export const getOffersNearby = (state) => state[NameSpace.DATA].offersNearby;
export const getRoom = (state) => state[NameSpace.DATA].room;
export const getRoomId = (state) => state[NameSpace.DATA].room.id;
export const getRoomLoadedStatus = (state) => state[NameSpace.DATA].isRoomLoaded;
export const getFavorites = (state) => arrangeOffersByCity(state[NameSpace.DATA].favorites);
export const getFavoritesLoadedStatus = (state) => state[NameSpace.DATA].isFavoritesLoaded;
const getComments = (state) => state[NameSpace.DATA].comments;

export const getSortedComments = createSelector(getComments, (values) => (
  values.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
));

const sortOffers = (values, sortBy, city) => {
  const shallowCopy = arrangeOffersByCity(values)[city.name].slice();

  switch (sortBy) {
    case SortByOptions.POPULAR:
      return arrangeOffersByCity(values)[city.name];
    case SortByOptions.PRICE_LOW:
      return shallowCopy.sort((a, b) => a.price - b.price);
    case SortByOptions.PRICE_HIGH:
      return shallowCopy.sort((a, b) => b.price - a.price);
    case SortByOptions.TOP_RATED:
      return shallowCopy.sort((a, b) => b.rating - a.rating);
    default:
      return shallowCopy;
  }
};

export const getSortedOffers = createSelector(
  getOffers,
  getSortBy,
  getCity,
  sortOffers,
);
