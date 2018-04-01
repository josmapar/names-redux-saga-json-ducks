import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNamesAction, createNameAction, deleteNameAction
      , editNameAction } from './duck/index';
import CounterComponent from './CounterComponent';
import InputComponent from './InputComponent';
import SearchComponent from './SearchComponent';
import TableComponent from './TableComponent';
import LoadingComponent from './LoadingComponent';
import { Panel, Button } from 'react-bootstrap';
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
    const { names, isLoading, isLoadingUpdate
      , createName, deleteName, editName } = this.props;
    const nameCreate = {
      id: -1,
      name: 'Jose Perez',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const nameEdit = {
      id: 21,
      name: 'Jose Manuel Perez',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const nameEdit2 = {
      id: 21,
      name: 'Jose Perez',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h1">Names</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Button onClick={() => createName(nameCreate)}>Create</Button>
          <Button onClick={() => deleteName(nameEdit)}>Delete</Button>
          <Button onClick={() => editName(nameEdit, nameEdit2)}>Edit</Button>
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
  isLoadingUpdate: PropTypes.bool,
  getNames: PropTypes.func.isRequired,
  createName: PropTypes.func.isRequired,
  deleteName: PropTypes.func.isRequired,
  editName: PropTypes.func.isRequired
};

const mapStateToProps = ({ names }) => ({
   names: names.names, //modulo.estado
   isLoading: names.isLoading,
   isLoadingUpdate: names.isLoadingUpdate,
   error: names.error
});

const mapDispatchToProps = (dispatch) => ({
  getNames: () => dispatch(getNamesAction()),
  createName: (name) => dispatch(createNameAction(name)),
  deleteName: (id) => dispatch(deleteNameAction(id)),
  editName: (name, origName) => dispatch(editNameAction(name, origName))
});

export default connect(mapStateToProps, 
  mapDispatchToProps)(enhance(NamesContainer));
