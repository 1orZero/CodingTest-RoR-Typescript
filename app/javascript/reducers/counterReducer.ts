import { withReduxStateSync } from "redux-state-sync";

interface ActionType {
	type: string;
	payload: number;
}
const counterReducer = (state = 0, action: ActionType) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		case "RESET":
			return (state = 0);
		default:
			return state;
	}
};
export default withReduxStateSync(counterReducer);
