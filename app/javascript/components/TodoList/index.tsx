import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios, { AxiosResponse } from "axios";

type TodoItem = {
	id: number;
	title: string;
	checked: boolean;
};

type Props = {
	todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
	useEffect(() => {
		const token = document.querySelector(
			"[name=csrf-token]"
		) as HTMLMetaElement;
		axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
	}, []);

	const [todos, setTodos] = useState(todoItems);

	const checkBoxOnCheck = async (
		e: React.ChangeEvent<HTMLInputElement>,
		todoItemId: number
	) => {
		const res = (await axios.post("/todo", {
			id: todoItemId,
			checked: e.target.checked,
		})) as AxiosResponse<TodoItem[]>;
		setTodos(res.data);
	};

	const resetButtonOnClick = async () => {
		const res = (await axios.post("/reset")) as AxiosResponse<TodoItem[]>;
		setTodos(res.data);
	};

	return (
		<Container>
			<h3>2022 Wish List</h3>
			<ListGroup>
				{todos.map((todo) => (
					<ListGroup.Item key={todo.id}>
						<Form.Check
							type="checkbox"
							label={todo.title}
							checked={todo.checked}
							onChange={(e) => checkBoxOnCheck(e, todo.id)}
						/>
					</ListGroup.Item>
				))}
				<ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
			</ListGroup>
		</Container>
	);
};

export default TodoList;
