import { put, call, takeLatest } from 'redux-saga/effects';
import { getNames } from '../../../api/names';

//Actions
const GET_NAMES_ERROR = 'app/names/GET_NAMES_ERROR';
const GET_NAMES_REQ = 'app/names/GET_NAMES_REQ';
const GET_NAMES_OK = 'app/names/GET_NAMES_OK';

// const DEC_COUNTER_ERROR = 'app/counter/DEC_COUNTER_ERROR';
// const DEC_COUNTER_REQ = 'app/counter/DEC_COUNTER_REQ';
// const INC_COUNTER_OK = 'app/counter/INC_COUNTER_OK';

//Initial State
const InitialState = {
  names: [],
  isLoading: false
};

//Reducer
export default function reducer(state = InitialState, action = {}) {
  switch(action.type) {
    case GET_NAMES_REQ: return {...state, isLoading: true};
    case GET_NAMES_OK: return {...state, names: action.names, isLoading: false};
    case GET_NAMES_ERROR: return {...state, error: action.error, isLoading: false};

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

export function* watchNames() {
  yield [
    takeLatest(GET_NAMES_REQ, getNamesSaga)
  ];
}
