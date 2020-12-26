import { combineReducers } from 'redux';
import { gamesReducer } from './gamesReducer';
import { detailReducer } from './detailReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  games: gamesReducer,
  details: detailReducer,
  auth: authReducer
});