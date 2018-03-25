import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import App from './app/App';
import { rootReducer, rootSaga } from './root';

const sagaMiddleware = createSagaMiddleware();
const store = {
  ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
  runSaga: sagaMiddleware.run(rootSaga)
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
