import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNamesAction, createNameAction, deleteNameAction
      , editNameAction, setNameSearchAction, setNameTextAction
      , setNameModeFormAction, setNameOrderAction } from './duck/index';
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
      getNames({q: search, _page: 1});
    },
    handleChangeSearch: ({ setSearch }) => (e) => {
      setSearch(e.target.value);
    },
    handleSubmitForm: ({createName, editName, nameText
      , modeForm, name}) => (e) => {
      e.preventDefault();
      console.log("handleSubmitForm ...");
      if(modeForm === 'Create') {
        const obj = {
          name: nameText,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        createName(obj);
      } else if(modeForm === 'Edit') {
        const obj = {
          ...name,
          name: nameText,
          updatedAt: new Date().toISOString()
        };
        //console.log(obj);
        editName(obj, name);
      }
    },
    handleChangeForm: ({ setNameText }) => (e) => {
      setNameText(e.target.value);
    },
    handleEdit: ({ setModeForm }) => (value) => {
      setModeForm('Edit', value);
      window.scroll(0,0);
    },
    handleCancelEdit: ({ setModeForm }) => () => {
      setModeForm('Create');
    },
    handleDelete: ({ deleteName }) => (value) => {
      deleteName(value);
    },
    handleChangePag: ({ actSearch, getNames, order }) => (pag) => {
      getNames({q: actSearch, _page: pag, order });
    },
    handlePrevPag: ({ actPag, actSearch, getNames, order }) => () => {
      if(actPag > 1)
        getNames({q: actSearch, _page: actPag - 1, order});
    },
    handleNextPag: ({ actPag, actSearch, totalPags, getNames, order }) => () => {
      if(actPag < totalPags)
        getNames({q: actSearch, _page: actPag + 1, order});
    },
    handleChangeOrd: ({ setOrder, getNames, order, actSearch, actPag }) => (field) => {
      //setOrder(field);
      getNames({q: actSearch, _page: actPag, oldOrder: order, field});
    }
  }),
  lifecycle({
    componentDidMount() {
      const { getNames } = this.props;
      getNames({ _page: 1 });
    }
  })
);

class NamesContainer extends Component {
  render() {
    const { names, isLoading, isLoadingUpdate
      , createName, deleteName, editName
      , getNames, handleSubmitSearch, search 
      , handleChangeSearch, setName, handleSubmitForm
      , handleChangeForm, nameText, modeForm 
      , handleEdit, handleDelete, totalPags
      , actPag, handleChangePag, handlePrevPag
      , handleNextPag, order, handleChangeOrd 
      , handleCancelEdit} = this.props;

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
            onCancelEdit={handleCancelEdit}
          /> 

          <SearchComponent onSubmitSearch={handleSubmitSearch} 
            onChangeSearch={handleChangeSearch} search={search} />
          <h2>Names List</h2>
          <TableComponent isLoading={isLoading} 
                          items={names} 
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          actPag={actPag}
                          totalPags={totalPags}
                          onChangePag={handleChangePag}
                          onPrev={handlePrevPag}
                          onNext={handleNextPag}
                          order={order}
                          onChangeOrd={handleChangeOrd}
                          />
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
   modeForm: names.modeForm,
   name: names.name,
   totalPags: names.totalPags,
   actPag: names.actPag,
   actSearch: names.actSearch,
   order: names.order
});

const mapDispatchToProps = (dispatch) => ({
  getNames: (query) => dispatch(getNamesAction(query)),
  createName: (name) => dispatch(createNameAction(name)),
  deleteName: (id) => dispatch(deleteNameAction(id)),
  editName: (name, origName) => dispatch(editNameAction(name, origName)),
  setSearch: (search) => dispatch(setNameSearchAction(search)),
  setNameText: (nameText) => dispatch(setNameTextAction(nameText)),
  setModeForm: (modeForm, name = null) => dispatch(setNameModeFormAction(modeForm, name)),
  setOrder: (field) => dispatch(setNameOrderAction(field))
});

export default connect(mapStateToProps, 
  mapDispatchToProps)(enhance(NamesContainer));
