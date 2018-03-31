import { combineReducers } from 'redux';
import counterReducer from './app/names/duck/index';

import { fork } from 'redux-saga/effects';
import { watchCounter } from './app/names/duck/index';

export const rootReducer = combineReducers({
  counter: counterReducer
});

export const rootSaga = function* startForeman() {
  yield fork(watchCounter);
}
