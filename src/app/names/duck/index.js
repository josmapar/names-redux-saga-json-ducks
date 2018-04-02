import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { getNames, createName, deleteName, editName } from '../../../api/names';
import { reject, findIndex, find } from 'lodash';

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
const SET_NAME_ENTITY = 'app/names/SET_NAME_ENTITY';

//Initial State
const InitialState = {
  names: [],
  isLoading: false,
  isLoadingUpdate: false,
  error: '',
  search: '',
  nameText: '',
  name: {
    id: -1,
    name: '',
    createdAt: '',
    updatedAt: ''
  },
  modeForm: 'Create'
};

function swapName(names, testfunc, name) {
  const ind = findIndex(names, testfunc);
  const st = [...names];
  st.splice(ind, 1, name);
  console.log(st);
  return st;
}

//Reducer
export default function reducer(state = InitialState, action = {}) {
  switch(action.type) {
    case GET_NAMES_REQ: return {...state, isLoading: true};
    case GET_NAMES_OK: return {...state, names: action.names, isLoading: false};
    case GET_NAMES_ERROR: return {...state, error: action.error, isLoading: false};

    case CREATE_NAME_REQ: return {...state, 
                          names: [action.tempName, ...state.names], 
                          isLoadingUpdate: true};
    case CREATE_NAME_OK:  return {...state, 
                          names: swapName(state.names, 
                            (n) => n === action.tempName, 
                            action.name),
                          isLoadingUpdate: false};
    case CREATE_NAME_ERROR: return {...state, 
                          error: action.error, 
                          names: reject(state.names, (n) => n === action.tempName),
                          isLoadingUpdate: false};

    case DELETE_NAME_REQ: return {...state, 
                          names: reject(state.names, (n) => n.id === action.tempName.id),
                          isLoadingUpdate: true};
    case DELETE_NAME_OK:  return {...state, 
                          isLoadingUpdate: false};
    case DELETE_NAME_ERROR: return {...state, 
                            error: action.error, 
                            names: [action.tempName, ...state.names],
                            isLoadingUpdate: false};

    case EDIT_NAME_REQ: return {...state, 
                        names: swapName(state.names,
                          (n) => n.id === action.tempName.id,
                          action.name),
                        isLoadingUpdate: true};
    case EDIT_NAME_OK: return {...state, 
                        names: swapName(state.names,
                          (n) => n.id === action.tempName.id,
                          action.name),
                        isLoadingUpdate: false};
    case EDIT_NAME_ERROR: return {...state, 
                          names: swapName(state.names,
                            (n) => n.id === action.tempName.id,
                            action.name),
                          isLoadingUpdate: false};
    case SET_NAME_SEARCH: return {
                            ...state,
                            search: action.search
                          };
    case SET_NAME_TEXT: return {
                          ...state,
                          nameText: action.nameText
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

//Sagas

function* getNamesSaga({query}) {
  try {
    const res = yield call(getNames, query);
    
    console.log("names:", res);
    yield put({type: GET_NAMES_OK, names: res.data});

  } catch (error) {
    console.log(error);
    yield put({type: GET_NAMES_ERROR, error: error.message});
  }
}

function* createNameSaga({tempName}) {
  try{
    // yield call(() => new Promise(res => setTimeout(res, 3000)));
    // throw new Error("error random");
    const res = yield call(createName, tempName);
    yield put({type: CREATE_NAME_OK, name: res.data, tempName});
  } catch(error) {
    console.log(error);
    yield put({type: CREATE_NAME_ERROR, error: error.message
      ,tempName });
  }
} 

function* deleteNameSaga({tempName}) {
  try{
    const res = yield call(deleteName, tempName);
    yield put({type: DELETE_NAME_OK});
  } catch(error) {
    console.log(error);
    yield put({type: DELETE_NAME_ERROR, error: error.message
      ,tempName});
  }
}

function* editNameSaga({name, tempName}) {
  try{
    //yield call(() => new Promise(res => setTimeout(res, 5000)));
    const res = yield call(editName, name);
    yield put({type: EDIT_NAME_OK, name: res.data, tempName});
  } catch(error) {
    console.log(error);
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
