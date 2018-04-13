import React from 'react';
import NamesContainer from './names/NamesContainer';
import { hot } from 'react-hot-loader';
import { Grid } from 'react-bootstrap';

const App = () => (
  <Grid fluid>
    <NamesContainer />
  </Grid>
);

export default hot(module)(App);
