import { NameSpace } from '../root-reducer';

export const getCity = (state) => state[NameSpace.UI].city;
export const getSortBy = (state) => state[NameSpace.UI].sortBy;
