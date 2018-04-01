import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNamesAction } from './duck/index';
import CounterComponent from './CounterComponent';
import InputComponent from './InputComponent';
import SearchComponent from './SearchComponent';
import TableComponent from './TableComponent';
import LoadingComponent from './LoadingComponent';
import { Panel } from 'react-bootstrap';
import { compose, withHandlers, lifecycle
   } from 'recompose';
//import './styles.css';

const enhance = compose(
  withHandlers({
    //handleIncrement: ({counterIncrement}) => () => (counterIncrement()),
  }),
  lifecycle({
    componentDidMount() {
      const { getNames } = this.props;
      getNames();
    }
  })
);

class NamesContainer extends Component {
  render() {
    const { names, isLoading } = this.props;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h1">Names</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <InputComponent />
          <SearchComponent />
          <h2>Names List</h2>
          <TableComponent isLoading={isLoading} 
                          items={names} />
        </Panel.Body>
      </Panel>
    );
  }
}

NamesContainer.propTypes = {
  names: PropTypes.array,
  isLoading: PropTypes.bool,
  getNames: PropTypes.func.isRequired
};

const mapStateToProps = ({ names }) => ({
   names: names.names, //modulo.estado
   isLoading: names.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  getNames: () => dispatch(getNamesAction())
});

export default connect(mapStateToProps, 
  mapDispatchToProps)(enhance(NamesContainer));
