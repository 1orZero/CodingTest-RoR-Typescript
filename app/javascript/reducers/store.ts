import { createStore, applyMiddleware } from "redux";
import {
	createStateSyncMiddleware,
	initStateWithPrevTab,
} from "redux-state-sync";
import counterReducer from "./counterReducer";

const middlewares = [createStateSyncMiddleware({})];
const store = createStore(counterReducer, applyMiddleware(...middlewares));

initStateWithPrevTab(store);
export default store;
