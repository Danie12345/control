import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import chips from './chips/chips';

const rootReducer = combineReducers({
  chips,
});
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
