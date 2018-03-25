import React from 'react';
import CounterContainer from './counter/CounterContainer';
import { hot } from 'react-hot-loader';

const App = () => (
  <div className="container-fluid text-center">
    <CounterContainer />
  </div>
);

export default hot(module)(App);
