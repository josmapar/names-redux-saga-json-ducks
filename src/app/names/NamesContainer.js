import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNamesAction, createNameAction, deleteNameAction
      , editNameAction, setNameSearchAction, setNameTextAction } from './duck/index';
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
    handleSubmitSearch: ({ getNames, search }) => (e) => {
      //setSearch(value);
      //getNames({q: value});
      e.preventDefault();
      getNames({q: search});
    },
    handleChangeSearch: ({ setSearch }) => (e) => {
      setSearch(e.target.value);
    },
    handleSubmitForm: ({createName, editName, nameText, modeForm}) => (e) => {
      e.preventDefault();
      if(modeForm === 'Create'){
        const obj = {
          name: nameText,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        createName(obj);
      } else if(modeForm === 'Edit') {
        //editName(obj);
      }
    },
    handleChangeForm: ({ setNameText }) => (e) => {
      setNameText(e.target.value);
    }
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
      , createName, deleteName, editName
      , getNames, handleSubmitSearch, search 
      , handleChangeSearch, setName, handleSubmitForm
      , handleChangeForm, nameText, modeForm } = this.props;

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
    const query = {q: 'Jo'};
    const sort_asc = {_sort: 'name', _order: 'asc'};
    const sort_desc = {_sort: 'name', _order: 'desc'};
    const q_sort_asc = {...query, ...sort_asc};
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h1">Names</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Button onClick={() => createName(nameCreate)}>Create</Button>
          <Button onClick={() => deleteName(nameEdit)}>Delete</Button>
          <Button onClick={() => editName(nameEdit, nameEdit2)}>Edit</Button>
          <Button onClick={() => getNames(query)}>Search</Button>
          <Button onClick={() => getNames(sort_asc)}>Order ASC</Button>
          <Button onClick={() => getNames(sort_desc)}>Order DESC</Button>
          <Button onClick={() => getNames(q_sort_asc)}>Search {'&'} Order ASC</Button>
          <InputComponent name={nameText} 
            onChangeForm={handleChangeForm} 
            onSubmitForm={handleSubmitForm}
            label={modeForm} 
          /> 

          <SearchComponent onSubmitSearch={handleSubmitSearch} 
            onChangeSearch={handleChangeSearch} search={search} />
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
  editName: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
  setNameText: PropTypes.func.isRequired,
  nameText: PropTypes.string,
  modeForm: PropTypes.string
};

const mapStateToProps = ({ names }) => ({
   names: names.names, //modulo.estado
   isLoading: names.isLoading,
   isLoadingUpdate: names.isLoadingUpdate,
   error: names.error,
   search: names.search,
   nameText: names.nameText,
   modeForm: names.modeForm
});

const mapDispatchToProps = (dispatch) => ({
  getNames: (query) => dispatch(getNamesAction(query)),
  createName: (name) => dispatch(createNameAction(name)),
  deleteName: (id) => dispatch(deleteNameAction(id)),
  editName: (name, origName) => dispatch(editNameAction(name, origName)),
  setSearch: (search) => dispatch(setNameSearchAction(search)),
  setNameText: (nameText) => dispatch(setNameTextAction(nameText))
});

export default connect(mapStateToProps, 
  mapDispatchToProps)(enhance(NamesContainer));
