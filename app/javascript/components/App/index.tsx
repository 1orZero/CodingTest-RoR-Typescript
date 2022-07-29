import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Provider } from "react-redux";
import store from "../../reducers/store";
import { TodoCategory, TodoItem } from "../../reducers/todoReducer";
import TodoList from "./Todos";

type Props = {
	todoItems: TodoItem[];
	categories: TodoCategory[];
};

const App: React.FC<Props> = ({ todoItems, categories }) => {
	useEffect(() => {
		const token = document.querySelector(
			"[name=csrf-token]"
		) as HTMLMetaElement;
		axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
	}, []);

	return (
		<Provider store={store}>
			<Container>
				<h3>2022 Wish List</h3>
				<TodoList todoItems={todoItems} categories={categories} />
			</Container>
		</Provider>
	);
};

export default App;
