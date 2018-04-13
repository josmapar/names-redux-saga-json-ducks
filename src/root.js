import { combineReducers } from 'redux';
import namesReducer from './app/names/duck/index';

import { fork } from 'redux-saga/effects';
import { watchNames } from './app/names/duck/index';

export const rootReducer = combineReducers({
  names: namesReducer
});

export const rootSaga = function* startForeman() {
  yield fork(watchNames);
}
