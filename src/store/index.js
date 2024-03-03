import { applyMiddleware, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import pincodeSaga from "./pincodeSaga";
import { all } from "redux-saga/effects";
import pincodeReducer from "./pincodeReducer";
function* rootSaga() {
  yield all([pincodeSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  pincode: pincodeReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
