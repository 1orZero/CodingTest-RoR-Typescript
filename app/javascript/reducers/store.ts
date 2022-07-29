import { createStore, applyMiddleware, combineReducers } from "redux";
import {
	createStateSyncMiddleware,
	initStateWithPrevTab,
	withReduxStateSync,
} from "redux-state-sync";
import todoReducer from "./todoReducer";

const reducers = combineReducers({
	todo: todoReducer,
});

const middlewares = [createStateSyncMiddleware({})];
const store = createStore(
	withReduxStateSync(reducers),
	applyMiddleware(...middlewares)
);

export type RootState = ReturnType<typeof store.getState>;

initStateWithPrevTab(store);
export default store;
