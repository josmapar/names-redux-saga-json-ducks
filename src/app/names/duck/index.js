import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { getNames, createName, deleteName, editName } from '../../../api/names';
import { reject, findIndex } from 'lodash';

//Actions
const GET_NAMES_ERROR = 'app/names/GET_NAMES_ERROR';
const GET_NAMES_REQ = 'app/names/GET_NAMES_REQ';
const GET_NAMES_OK = 'app/names/GET_NAMES_OK';

const CREATE_NAME_ERROR = 'app/names/CREATE_NAME_ERROR';
const CREATE_NAME_REQ = 'app/names/CREATE_NAME_REQ';
const CREATE_NAME_OK = 'app/names/CREATE_NAME_OK';

const DELETE_NAME_ERROR = 'app/names/DELETE_NAME_ERROR';
const DELETE_NAME_REQ = 'app/names/DELETE_NAME_REQ';
const DELETE_NAME_OK = 'app/names/DELETE_NAME_OK';

const EDIT_NAME_ERROR = 'app/names/EDIT_NAME_ERROR';
const EDIT_NAME_REQ = 'app/names/EDIT_NAME_REQ';
const EDIT_NAME_OK = 'app/names/EDIT_NAME_OK';

const SET_NAME_SEARCH = 'app/names/SET_NAME_SEARCH';
const SET_NAME_TEXT = 'app/names/SET_NAME_TEXT';
const SET_NAME_MODE_FORM = 'app/names/SET_NAME_MODE_FORM';
const SET_NAME_ORDER = 'app/names/SET_NAME_ORDER';
const SHOW_NAME_DELETE_CONF = 'app/names/SHOW_NAME_DELETE_CONF';
const CANCEL_NAME_DELETE_CONF = 'app/names/CANCEL_NAME_DELETE_CONF';
const OK_NAME_ERROR = 'app/names/OK_NAME_ERROR';

// name {
//   id: -1,
//   name: '',
//   createdAt: '',
//   updatedAt: ''
// };
//order {field, type}

//Initial State
const InitialState = {
  names: [],
  isLoading: false,
  isLoadingUpdate: false,
  error: '',
  search: '',
  actSearch: '',
  nameText: '',
  _nameText: '',
  name: null,
  modeForm: 'Create', //Create,Edit
  totalPags: 1,
  actPag: 1,
  _actPag: 1,
  order: null, 
  _order: null,
  showConfDel: false
};

//utils
function swapName(names, testfunc, name) {
  const ind = findIndex(names, testfunc);
  const st = [...names];
  st.splice(ind, 1, name);
  return st;
}

function calOrder(query, opts = {nameField: 'field', nameType: 'type'}) {
  const { nameField, nameType } = opts;
  let res = {[nameField]: 'name', [nameType]: 'asc'};
  if(typeof(query.order) !== 'undefined' && query.order !== null) {
    res = {
      [nameField]: query.order.field,
      [nameType]: query.order.type
    };
  } else if(typeof(query.oldOrder) !== 'undefined' 
          && typeof(query.field) !== 'undefined') {
    if(query.oldOrder === null 
      || query.oldOrder.field !== query.field) {
      res = {
        [nameField]: query.field,
        [nameType]: 'asc'
      };
    } else {
      res = {
        [nameField]: query.field,
        [nameType]: query.oldOrder.type==='asc'?'desc':'asc'
      };
    }
  }
  return res;
}

function calcTotal(res) {
  const totalItems = parseInt(res.headers['x-total-count'], 10);
  const limit = 10; //default
  const totalPags = parseInt(Math.ceil(totalItems/limit), 10);
  return totalPags;
}

//Reducer
export default function reducer(state = InitialState, action = {}) {
  switch(action.type) {
    case GET_NAMES_REQ: return {...state, isLoading: true, _actPag: state.actPag, actPag: action.query._page, _order: state.order, order: calOrder(action.query)};
    case GET_NAMES_OK: return {...state, names: action.names, totalPags: action.totalPags, actPag: action.actPag, actSearch: action.actSearch, _order: null, isLoading: false};
    case GET_NAMES_ERROR: return {...state, error: action.error, actPag: state._actPag, order: state._order, isLoading: false};

    case CREATE_NAME_REQ: return {...state, 
                          names: [action.tempName, ...state.names], 
                          _nameText: state.nameText,
                          nameText: '',
                          isLoadingUpdate: true};
    case CREATE_NAME_OK:  return {...state, 
                          names: swapName(state.names, 
                            (n) => n === action.tempName, 
                            action.name),
                          _nameText: '',
                          totalPags: action.totalPags,
                          isLoadingUpdate: false};
    case CREATE_NAME_ERROR: return {...state, 
                          error: action.error, 
                          names: reject(state.names, (n) => n === action.tempName),
                          nameText: state._nameText,
                          _nameText: '',
                          isLoadingUpdate: false};

    case DELETE_NAME_REQ: return {...state, 
                          names: reject(state.names, (n) => n.id === action.tempName.id),
                          showConfDel: false,
                          isLoadingUpdate: true};
    case DELETE_NAME_OK:  return {...state, 
                          totalPags: action.totalPags,
                          isLoadingUpdate: false};
    case DELETE_NAME_ERROR: return {...state, 
                            error: action.error, 
                            names: [action.tempName, ...state.names],
                            showConfDel: true,
                            isLoadingUpdate: false};

    case EDIT_NAME_REQ: return {...state, 
                        names: swapName(state.names,
                          (n) => n.id === action.tempName.id,
                          action.name),
                        modeForm: 'Create',
                        _nameText: state.nameText,
                        nameText: '',
                        isLoadingUpdate: true};
    case EDIT_NAME_OK: return {...state, 
                        names: swapName(state.names,
                          (n) => n.id === action.tempName.id,
                          action.name),
                        name: null,
                        _nameText: '',
                        isLoadingUpdate: false};
    case EDIT_NAME_ERROR: return {...state,
                          error: action.error,  
                          names: swapName(state.names,
                            (n) => n.id === action.tempName.id,
                            action.name),
                          nameText: state._nameText,
                          _nameText: '',
                          modeForm: 'Edit',
                          isLoadingUpdate: false};
    case SET_NAME_SEARCH: return {
                            ...state,
                            search: action.search
                          };
    case SET_NAME_TEXT: return {
                          ...state,
                          nameText: action.nameText
                        };
    case SET_NAME_MODE_FORM: 
                        const { modeForm } = action;                    
                        let name;
                        let nameText;
                        
                        switch(modeForm) {
                          case 'Create':
                            name = null;
                            nameText = '';
                            break;
                          case 'Edit':
                            name = action.name;
                            nameText = action.name.name;
                            break;
                          default: 
                            break;
                        }

                        return {
                          ...state,
                          modeForm,
                          name,
                          nameText
                        };
    case SET_NAME_ORDER: 
                      let order;
                      if(state.order === null)
                        order = {field: action.field, type: 'asc'};
                      else 
                        order = {field: action.field, type: state.order.type==='asc'?'desc':'asc'};
                      return {
                        ...state,
                        order
                      };
    case SHOW_NAME_DELETE_CONF:
                      return {
                        ...state,
                        showConfDel: true,
                        name: action.name
                      };
    case CANCEL_NAME_DELETE_CONF:
                      return {
                        ...state,
                        showConfDel: false,
                        name: null
                      };
    case OK_NAME_ERROR:
                      return {
                        ...state,
                        error: ''
                      };
    default: return state;
  }
}

//Action Creators

export function getNamesAction(query) {
  return {
    type: GET_NAMES_REQ,
    query
  };
}

export function createNameAction(name) {
  return {
    type: CREATE_NAME_REQ,
    tempName: name
  };
}

export function deleteNameAction(name) {
  return {
    type: DELETE_NAME_REQ,
    tempName: name
  };
}

export function editNameAction(name, tempName) {
  return {
    type: EDIT_NAME_REQ,
    tempName,
    name
  };
}

export function setNameSearchAction(search) {
  return {
    type: SET_NAME_SEARCH,
    search
  };
}

export function setNameTextAction(nameText) {
  return {
    type: SET_NAME_TEXT,
    nameText
  };
}

export function setNameModeFormAction(modeForm, name = null) {
  return {
    type: SET_NAME_MODE_FORM,
    modeForm,
    name
  };
}

export function setNameOrderAction(field) {
  return {
    type: SET_NAME_ORDER,
    field
  };
}

export function showNameDeleteConfAction(name) {
  return {
    type: SHOW_NAME_DELETE_CONF,
    name
  };
}

export function cancelNameDeleteConfAction() {
  return {
    type: CANCEL_NAME_DELETE_CONF
  };
}

export function okNameErrorAction() {
  return {
    type: OK_NAME_ERROR
  };
}

//Sagas

function* getNamesSaga({query}) {
  try {
    const res = yield call(getNames, {
      q: query.q, 
      _page: query._page, 
      ...calOrder(query, {nameField: '_sort', nameType: '_order'})
    });

    const totalPags = calcTotal(res);

    yield [put({type: GET_NAMES_OK, names: res.data, totalPags
      , actPag: query._page, actSearch: query.q || ''}),
          put];
  } catch (error) {
    
    yield put({type: GET_NAMES_ERROR, error: error.message});
  }
}

function* createNameSaga({tempName}) {
  try{
    const res = yield call(createName, tempName);
    const pag = yield call(getNames, {_page:1, _limit:1});

    yield put({type: CREATE_NAME_OK, name: res.data, tempName, totalPags: calcTotal(pag)});
  } catch(error) {

    yield put({type: CREATE_NAME_ERROR, error: error.message
      ,tempName });
  }
} 

function* deleteNameSaga({tempName}) {
  try{
    yield call(deleteName, tempName);
    const pag = yield call(getNames, {_page:1, _limit:1});

    yield put({type: DELETE_NAME_OK, totalPags: calcTotal(pag)});
  } catch(error) {
    
    yield put({type: DELETE_NAME_ERROR, error: error.message
      ,tempName });
  }
}

function* editNameSaga({name, tempName}) {
  try{
    const res = yield call(editName, name);

    yield put({type: EDIT_NAME_OK, name: res.data, tempName});
  } catch(error) {
    
    yield put({type: EDIT_NAME_ERROR, error: error.message
      ,tempName });
  }
}

export function* watchNames() {
  yield [
    takeLatest(GET_NAMES_REQ, getNamesSaga),
    takeEvery(CREATE_NAME_REQ, createNameSaga),
    takeEvery(DELETE_NAME_REQ, deleteNameSaga),
    takeEvery(EDIT_NAME_REQ, editNameSaga)
  ];
}
