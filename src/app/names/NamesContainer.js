import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { counterIncrementAction, counterDecrementAction } from './duck/index';
import CounterComponent from './CounterComponent';
import InputComponent from './InputComponent';
import SearchComponent from './SearchComponent';
import { Panel } from 'react-bootstrap';
import { compose, withHandlers } from 'recompose';
//import './styles.css';

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
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h1">Names</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <InputComponent />
          <SearchComponent />
          <h2>Names List</h2>
        </Panel.Body>
      </Panel>
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
