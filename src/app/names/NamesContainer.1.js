import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { counterIncrementAction, counterDecrementAction } from './duck/index';
import CounterComponent from './CounterComponent';
import { compose, withHandlers } from 'recompose';
import './styles.css';

const enhance = compose(
  withHandlers({
    handleIncrement: ({counterIncrement}) => () => (counterIncrement()),
    handleDecrement: ({counterDecrement}) => () => (counterDecrement())
  })
);

class CounterContainer extends Component {
  render() {
    const { counter, isLoading, handleIncrement, handleDecrement } = this.props;
    return (
      <div className="panel panel-primary counter-panel">
        <div className="panel-heading counter-panel-heading">Counter Redux</div>
        <div className="panel-body">
          <CounterComponent  
            counter={counter}
            isLoading={isLoading}
            onHandleIncrement={handleIncrement}
            onHandleDecrement={handleDecrement}
          />
        </div>
      </div>
    );
  }
}

CounterContainer.propTypes = {
  counter: PropTypes.number,
  isLoading: PropTypes.bool,
  counterIncrement: PropTypes.func.isRequired,
  counterDecrement: PropTypes.func.isRequired
};

const mapStateToProps = ({ counter }) => ({
   counter: counter.counter, //modulo.estado
   isLoading: counter.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  counterIncrement: () => dispatch(counterIncrementAction()),
  counterDecrement: () => dispatch(counterDecrementAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(enhance(CounterContainer));
