import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import {
	createStateSyncMiddleware,
	initStateWithPrevTab,
	withReduxStateSync,
} from "redux-state-sync";
import categoryReducer from "./categoryReducer";
import counterReducer from "./counterReducer";
import todoReducer from "./todoReducer";

const reducers = combineReducers({
	todo: todoReducer,
	// category: categoryReducer,
	// count: counterReducer,
});

const middlewares = [createStateSyncMiddleware({})];
const store = createStore(
	withReduxStateSync(reducers),
	applyMiddleware(...middlewares)
);

export type RootState = ReturnType<typeof store.getState>;

initStateWithPrevTab(store);
export default store;
