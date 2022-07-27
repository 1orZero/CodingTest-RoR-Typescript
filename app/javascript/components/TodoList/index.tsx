import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import TodoGroup from "./components/TodoGroup";

export type TodoItem = {
	id: number;
	title: string;
	checked: boolean;
	category_id: number;
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

	return (
		<Container>
			<h3>2022 Wish List</h3>
			<TodoGroup todoItems={todoItems} />
		</Container>
	);
};

export default TodoList;
