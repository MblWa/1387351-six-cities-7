import { NameSpace } from '../root-reducer';

export const getOffers = (state) => state[NameSpace.DATA].offers;
export const getOffersLoadedStatus = (state) => state[NameSpace.DATA].isOffersLoaded;
export const getOffersNearby = (state) => state[NameSpace.DATA].offersNearby;
export const getRoom = (state) => state[NameSpace.DATA].room;
export const getRoomId = (state) => state[NameSpace.DATA].room.id;
export const getRoomLoadedStatus = (state) => state[NameSpace.DATA].isRoomLoaded;
export const getComments = (state) => state[NameSpace.DATA].comments;
