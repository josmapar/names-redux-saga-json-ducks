import React from 'react';
import NamesContainer from './names/NamesContainer';
import { hot } from 'react-hot-loader';

const App = () => (
  <div className="container-fluid text-center">
    <NamesContainer />
  </div>
);

export default hot(module)(App);
