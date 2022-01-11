import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules/rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./modules/rootSaga";

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)

export default store;
