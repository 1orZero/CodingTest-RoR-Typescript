import axios, { AxiosResponse } from "axios";
import { TodoItem } from "../reducers/todoReducer";

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
};
