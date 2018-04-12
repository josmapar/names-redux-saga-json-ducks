import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNamesAction, createNameAction, deleteNameAction
      , editNameAction, setNameSearchAction, setNameTextAction
      , setNameModeFormAction, setNameOrderAction
      , showNameDeleteConfAction, cancelNameDeleteConfAction
      , okNameErrorAction } from './duck/index';
import InputComponent from './InputComponent';
import SearchComponent from './SearchComponent';
import TableComponent from './TableComponent';
import { Panel, Button, Modal
  , Glyphicon, Row, Col } from 'react-bootstrap';
import { compose, withHandlers, lifecycle
   } from 'recompose';
import './styles.css';

const enhance = compose(
  withHandlers({
    handleSubmitSearch: ({ getNames, search }) => (e) => {
      e.preventDefault();
      getNames({q: search, _page: 1});
    },
    handleChangeSearch: ({ setSearch }) => (e) => {
      setSearch(e.target.value);
    },
    handleSubmitForm: ({createName, editName, nameText
      , modeForm, name}) => (e) => {
      e.preventDefault();
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
    handleShowDeleteConf: ({ showDeleteConf }) => (value) => {
      showDeleteConf(value);
    },
    handleDeleteConfCancel: ({ cancelDeleteConf }) => () => {
      cancelDeleteConf();
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
      getNames({q: actSearch, _page: actPag, oldOrder: order, field});
    },
    handleOkError: ({ okNameError }) => () => {
      okNameError();
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
      , handleChangeSearch, handleSubmitForm
      , handleChangeForm, nameText, modeForm 
      , handleEdit, handleDelete, totalPags
      , actPag, handleChangePag, handlePrevPag
      , handleNextPag, order, handleChangeOrd 
      , handleCancelEdit, showConfDel
      , handleDeleteConfCancel, handleShowDeleteConf, name
      , handleOkError, error
       } = this.props;

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h1">Names</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <InputComponent name={nameText} 
            onChangeForm={handleChangeForm} 
            onSubmitForm={handleSubmitForm}
            label={modeForm} 
            onCancelEdit={handleCancelEdit}
            isLoadingUpdate={isLoadingUpdate}
          /> 

          <Row>
            <Col md={7} mdPush={5}>
              <SearchComponent onSubmitSearch={handleSubmitSearch} 
                onChangeSearch={handleChangeSearch} search={search} />
            </Col>
            <Col md={5} mdPull={7}>
              <h2 className="names-title">Names List</h2>
            </Col>
          </Row>

          <TableComponent isLoading={isLoading} 
                          items={names} 
                          onEdit={handleEdit}
                          onDelete={handleShowDeleteConf}
                          actPag={actPag}
                          totalPags={totalPags}
                          onChangePag={handleChangePag}
                          onPrev={handlePrevPag}
                          onNext={handleNextPag}
                          order={order}
                          onChangeOrd={handleChangeOrd}
                          isLoadingUpdate={isLoadingUpdate}
                          modeForm={modeForm}
                          />
          
          <Modal show={showConfDel} onHide={handleDeleteConfCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Delete? </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Are you sure to delete {name && name.name}?</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleDeleteConfCancel}>Close</Button>
              <Button bsStyle="danger" onClick={() => handleDelete(name)}>Delete</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={error !== ''} onHide={handleOkError}>
            <Modal.Header closeButton>
              <Modal.Title><Glyphicon className="glyph-error" glyph="remove-sign" /> Ooops Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{error}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={handleOkError}>OK</Button>
            </Modal.Footer>
          </Modal>
        </Panel.Body>
      </Panel>
    );
  }
}

NamesContainer.propTypes = {
  names: PropTypes.array.isRequired, 
  isLoading: PropTypes.bool.isRequired, 
  isLoadingUpdate: PropTypes.bool.isRequired,
  createName: PropTypes.func.isRequired, 
  deleteName: PropTypes.func.isRequired, 
  editName: PropTypes.func.isRequired,
  getNames: PropTypes.func.isRequired, 
  handleSubmitSearch: PropTypes.func.isRequired, 
  search: PropTypes.string.isRequired, 
  handleChangeSearch: PropTypes.func.isRequired, 
  setNameText: PropTypes.func.isRequired, 
  handleSubmitForm: PropTypes.func.isRequired,
  handleChangeForm: PropTypes.func.isRequired, 
  nameText: PropTypes.string.isRequired, 
  modeForm: PropTypes.oneOf(['Create', 'Edit']).isRequired, 
  handleEdit: PropTypes.func.isRequired, 
  handleDelete: PropTypes.func.isRequired, 
  totalPags: PropTypes.number.isRequired,
  actPag: PropTypes.number.isRequired, 
  handleChangePag: PropTypes.func.isRequired, 
  handlePrevPag: PropTypes.func.isRequired,
  handleNextPag: PropTypes.func.isRequired, 
  order: PropTypes.object, 
  handleChangeOrd: PropTypes.func.isRequired, 
  handleCancelEdit: PropTypes.func.isRequired, 
  showConfDel: PropTypes.bool.isRequired,
  handleDeleteConfCancel: PropTypes.func.isRequired, 
  handleShowDeleteConf: PropTypes.func.isRequired, 
  name: PropTypes.object,
  handleOkError: PropTypes.func.isRequired, 
  error: PropTypes.string.isRequired,

  actSearch: PropTypes.string.isRequired,

  setSearch: PropTypes.func.isRequired,
  setModeForm: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  showDeleteConf: PropTypes.func.isRequired,
  cancelDeleteConf: PropTypes.func.isRequired,
  okNameError: PropTypes.func.isRequired
};

const mapStateToProps = ({ names }) => ({
   names: names.names, //module.state
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
   order: names.order,
   showConfDel: names.showConfDel
});

const mapDispatchToProps = (dispatch) => ({
  getNames: (query) => dispatch(getNamesAction(query)),
  createName: (name) => dispatch(createNameAction(name)),
  deleteName: (id) => dispatch(deleteNameAction(id)),
  editName: (name, origName) => dispatch(editNameAction(name, origName)),
  setSearch: (search) => dispatch(setNameSearchAction(search)),
  setNameText: (nameText) => dispatch(setNameTextAction(nameText)),
  setModeForm: (modeForm, name = null) => dispatch(setNameModeFormAction(modeForm, name)),
  setOrder: (field) => dispatch(setNameOrderAction(field)),
  showDeleteConf: (name) => dispatch(showNameDeleteConfAction(name)),
  cancelDeleteConf: () => dispatch(cancelNameDeleteConfAction()),
  okNameError: () => dispatch(okNameErrorAction())
});

export default connect(mapStateToProps, 
  mapDispatchToProps)(enhance(NamesContainer));
