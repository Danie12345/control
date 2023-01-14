import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import settings from './settings/settings';
import chips from './chips/chips';

const rootReducer = combineReducers({
  settings,
  chips,
});
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
