import { TodoCategory } from "./../reducers/todoReducer";
import axios, { AxiosResponse } from "axios";
import { TodoItem } from "../reducers/todoReducer";
import { HistoryRecord } from "../components/App/components/HistoryModal";

export default {
	addHistory: async (todoId: number, content: string) => {
		try {
			const res = (await axios.post("/addHistory", {
				id: todoId,
				content,
			})) as AxiosResponse<TodoItem[]>;
			if (res.status === 200) {
				return res.data;
			}
		} catch {
			return [];
		}
	},
	addCategory: async (categoryName: string) => {
		try {
			const res = (await axios.post("/addCategory", {
				name: categoryName,
			})) as AxiosResponse<TodoCategory[]>;
			if (res.status === 200) {
				return res.data;
			}
			return [];
		} catch {
			return [];
		}
	},
	addNewTodo: async (
		content: string,
		checked: boolean,
		categoryId: number
	) => {
		try {
			const res = (await axios.post("/add", {
				content,
				checked,
				category_id: categoryId,
			})) as AxiosResponse<TodoItem[]>;
			if (res.status === 200) {
				return res.data;
			}
			return [];
		} catch {
			return [];
		}
	},
	getHistoryById: async (todoId: number) => {
		try {
			const res = (await axios.post("/getHistoryByTodoId", {
				todo_id: todoId,
			})) as AxiosResponse<HistoryRecord[]>;
			if (res.status === 200) return res.data;
			return [];
		} catch {
			return [];
		}
	},
	updateCheckState: async (todoId: number, checked: boolean) => {
		try {
			const res = (await axios.post("/todo", {
				id: todoId,
				checked: checked,
			})) as AxiosResponse<TodoItem[]>;
			if (res.status === 200) {
				return res.data;
			}
			return [];
		} catch {
			return [];
		}
	},
	deleteTodo: async (todoId: number, categoryId: number) => {
		try {
			const res = (await axios.post("/del", {
				id: todoId,
				category_id: categoryId,
			})) as AxiosResponse<TodoItem[]>;
			if (res.status === 200) {
				return res.data;
			}
			return [];
		} catch {
			return [];
		}
	},
	resetTodoByCategoryId: async (categoryId: number) => {
		try {
			const res = (await axios.post("/reset", {
				category_id: categoryId,
			})) as AxiosResponse<TodoItem[]>;
			if (res.status === 200) {
				return res.data;
			}
			return [];
		} catch {
			return [];
		}
	},
	deleteCategory: async (categoryId: number) => {
		try {
			const res = (await axios.post("/delCategory", {
				id: categoryId,
			})) as AxiosResponse<TodoCategory[]>;
			if (res.status === 200) {
				return res.data;
			}
			return [];
		} catch {
			return [];
		}
	},
};
