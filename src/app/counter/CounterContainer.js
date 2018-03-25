import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { counterIncrementAction, counterDecrementAction } from './duck/index';
import CounterComponent from './CounterComponent';
import './styles.css';

class CounterContainer extends Component {
  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    this.props.dispatch(counterIncrementAction());
  }

  handleDecrement() {
    this.props.dispatch(counterDecrementAction());
  }

  render() {
    const { counter, isLoading } = this.props;
    return (
      <div className="panel panel-primary counter-panel">
        <div className="panel-heading counter-panel-heading">Counter Redux</div>
        <div className="panel-body">
          <CounterComponent  
            counter={counter}
            isLoading={isLoading}
            onHandleIncrement={this.handleIncrement}
            onHandleDecrement={this.handleDecrement}
          />
        </div>
      </div>
    );
  }
}

CounterContainer.propTypes = {
  counter: PropTypes.number,
  isLoading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ counter }) => ({
   counter: counter.counter, //modulo.estado
   isLoading: counter.isLoading
});

export default connect(mapStateToProps)(CounterContainer);
