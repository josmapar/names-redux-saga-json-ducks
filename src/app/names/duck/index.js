import { put, call, takeLatest } from 'redux-saga/effects';
import { getRandomNumber } from '../../../api/random';

//Actions
//const INCREMENT = 'app/counter/INCREMENT';
//const DECREMENT = 'app/counter/DECREMENT';

const INC_COUNTER_ERROR = 'app/counter/INC_COUNTER_ERROR';
const DEC_COUNTER_ERROR = 'app/counter/DEC_COUNTER_ERROR';
const INC_COUNTER_REQ = 'app/counter/INC_COUNTER_REQ';
const DEC_COUNTER_REQ = 'app/counter/DEC_COUNTER_REQ';
const INC_COUNTER_OK = 'app/counter/INC_COUNTER_OK';
const DEC_COUNTER_OK = 'app/counter/DEC_COUNTER_OK';

//Initial State
const InitialState = {
  counter: 0,
  isLoading: false
};

//Reducer
export default function reducer(state = InitialState, action = {}) {
  switch(action.type) {
    case INC_COUNTER_REQ: return {...state, isLoading: true};
    case INC_COUNTER_OK: return {...state, counter: state.counter + 1, isLoading: false};
    case INC_COUNTER_ERROR: return {...state, isLoading: false};

    case DEC_COUNTER_REQ: return {...state, isLoading: true};
    case DEC_COUNTER_OK: return {...state, counter: state.counter>0?state.counter - 1:0, isLoading: false};
    case DEC_COUNTER_ERROR: return {...state, isLoading: false};
    
    default: return state;
  }
}

//Action Creators

export function counterIncrementAction() {
  return {
    type: INC_COUNTER_REQ
  };
}

export function counterDecrementAction() {
  return {
    type: DEC_COUNTER_REQ
  };
}

//Sagas

export function* incCounterSaga() {
  try {
    const res = yield call(getRandomNumber);
    
    if (res > 7) throw new Error('Ramdom Mayor');
    console.log("value Random:", res);
    yield put({type: INC_COUNTER_OK});

  } catch (error) {
    console.log(error.message);
    yield put({type: INC_COUNTER_ERROR, error});
  }
}

export function* decCounterSaga() {
  try {
    const res = yield call(getRandomNumber);

    if (res < 3) throw new Error('Ramdom Menor');
    console.log("value Random:", res);
    
    yield put({type: DEC_COUNTER_OK});
  } catch (error) {
    console.log(error.message);
    yield put({type: DEC_COUNTER_ERROR, error});
  }
}

export function* watchCounter() {
  yield takeLatest(INC_COUNTER_REQ, incCounterSaga);
  yield takeLatest(DEC_COUNTER_REQ, decCounterSaga);
}


