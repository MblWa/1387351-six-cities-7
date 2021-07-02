import { combineReducers } from 'redux';
import { uiInteraction } from './ui-interaction/ui-interaction';
import { appData } from './app-data/app-data';
import { user } from './user/user';

export const NameSpace = {
  DATA: 'DATA',
  UI: 'UI',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.UI]: uiInteraction,
  [NameSpace.USER]: user,
});
