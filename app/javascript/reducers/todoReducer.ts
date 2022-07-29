import { withReduxStateSync } from "redux-state-sync";

export interface TodoItem {
	id: number;
	title: string;
	checked: boolean;
	category_id: number;
}
export interface TodoCategory {
	id: number;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
}

interface ActionType {
	type: string;
	payload: TodoCategory[] | TodoItem[];
}
const initState = {
	todoItem: [] as TodoItem[],
	categories: [] as TodoCategory[],
};
const todoReducer = (state = initState, action: ActionType) => {
	switch (action.type) {
		case "SET_TODO_ITEMS":
			return setTodoItems(state, action.payload as TodoItem[]);
		case "SET_CATEGORIES":
			return setCategories(state, action.payload as TodoCategory[]);
		default:
			return state;
	}
};

function setTodoItems(state: typeof initState, todoItems: TodoItem[]) {
	return {
		...state,
		todoItem: [...todoItems],
	};
}
function setCategories(state: typeof initState, categories: TodoCategory[]) {
	return {
		...state,
		categories: [...categories],
	};
}
export default todoReducer;
