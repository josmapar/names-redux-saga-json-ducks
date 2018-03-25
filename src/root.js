import { combineReducers } from 'redux';
import counterReducer from './app/counter/duck/index';

import { fork } from 'redux-saga/effects';
import { watchCounter } from './app/counter/duck/index';

export const rootReducer = combineReducers({
  counter: counterReducer
});

export const rootSaga = function* startForeman() {
  yield fork(watchCounter);
}
