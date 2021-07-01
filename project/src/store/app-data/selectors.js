import { createSelector } from 'reselect';
import { NameSpace } from '../root-reducer';
import { getCity, getSortBy } from '../ui-interaction/selectors';
import { sortOffers } from '../../util';

export const getOffers = (state) => state[NameSpace.DATA].offers;
export const getOffersLoadedStatus = (state) => state[NameSpace.DATA].isOffersLoaded;
export const getOffersNearby = (state) => state[NameSpace.DATA].offersNearby;
export const getRoom = (state) => state[NameSpace.DATA].room;
export const getRoomId = (state) => state[NameSpace.DATA].room.id;
export const getRoomLoadedStatus = (state) => state[NameSpace.DATA].isRoomLoaded;

const getComments = (state) => state[NameSpace.DATA].comments;

export const getSortedComments = createSelector(getComments, (values) => (
  values.sort((a, b) => new Date(b.date) - new Date(a.date))
));

export const getSortedOffers = createSelector(
  getOffers,
  getSortBy,
  getCity,
  sortOffers,
);
