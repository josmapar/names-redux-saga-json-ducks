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

//Initial State
const InitialState = {
  names: [],
  isLoading: false,
  isLoadingUpdate: false,
  error: ''
};

//Reducer
export default function reducer(state = InitialState, action = {}) {
  let ind = -1;
  let st = [];

  switch(action.type) {
    case GET_NAMES_REQ: return {...state, isLoading: true};
    case GET_NAMES_OK: return {...state, names: action.names, isLoading: false};
    case GET_NAMES_ERROR: return {...state, error: action.error, isLoading: false};

    case CREATE_NAME_REQ: return {...state, 
                          names: [action.tempName, ...state.names], 
                          isLoadingUpdate: true};
    case CREATE_NAME_OK:  ind = findIndex(state.names, (n) => n === action.tempName);
                          st = [...state.names];
                          st.splice(ind, 1, action.name);
                          console.log(st);
                          return {...state, 
                          names: st,
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

    case EDIT_NAME_REQ: ind = findIndex(state.names, (n) => n.id === action.tempName.id);
                        st = [...state.names];
                        st.splice(ind, 1, action.name);
                        console.log(st);
                        return {...state, 
                        names: st,
                        isLoadingUpdate: true};
    case EDIT_NAME_OK:  ind = findIndex(state.names, (n) => n.id === action.tempName.id);
                        st = [...state.names];
                        st.splice(ind, 1, action.name);
                        console.log(st);
                        return {...state, 
                        names: st,
                        isLoadingUpdate: false};
    case EDIT_NAME_ERROR: ind = findIndex(state.names, (n) => n.id === action.tempName.id);
                          st = [...state.names];
                          st.splice(ind, 1, action.tempName);
                          console.log(st);
                          return {...state, 
                          names: st,
                          isLoadingUpdate: false};                        
    default: return state;
  }
}

//Action Creators

export function getNamesAction() {
  return {
    type: GET_NAMES_REQ,
    payload: null
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

//Sagas

function* getNamesSaga() {
  try {
    const res = yield call(getNames);
    
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
    yield call(() => new Promise(res => setTimeout(res, 5000)));
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
