import React from 'react';
import PropTypes from 'prop-types';
import ReduxLogo from './redux.png';
import Loading from '../blue-loading.gif';

const CounterComponent = ({counter, isLoading, onHandleIncrement, onHandleDecrement}) => (
  <div>
    <div id="counter-view">
    {isLoading?
      <img id="counter-loading" alt="Loading" src={Loading} />
    :
      <p id="counter-number">{counter}</p>
    }
    </div>
    
    <div>
      <div className="col-xs-5 text-right">
        <button className="btn btn-lg btn-success counter" onClick={onHandleIncrement.bind(this)}>Increment</button>
      </div>

      <div className="col-xs-2" />

      <div className="col-xs-5 text-left">
        <button className="btn btn-lg btn-danger counter" onClick={onHandleDecrement.bind(this)}>Decrement</button>
      </div>
    </div>

    <div id="counter-redux-section">
      <a href="https://redux.js.org/" rel="noopener noreferrer" target="_blank">
        <img id="counter-logo" alt="redux logo" src={ReduxLogo} />
      </a>
    </div>
  </div>
);

CounterComponent.propTypes = {
  counter: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onHandleIncrement: PropTypes.func.isRequired,
  onHandleDecrement: PropTypes.func.isRequired
};

export default CounterComponent;
