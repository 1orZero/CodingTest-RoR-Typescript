import axios, { AxiosResponse } from "axios";
import { TodoCategory, TodoItem } from "../reducers/todoReducer";

export const updateTodoItems = (todoItems: TodoItem[]) => {
	return {
		type: "SET_TODO_ITEMS",
		payload: todoItems,
	};
};

export const updateCategories = (categories: TodoCategory[]) => {
	return { type: "SET_CATEGORIES", payload: categories };
};
