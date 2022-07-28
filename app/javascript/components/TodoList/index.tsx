import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import TodoGroup from "./components/TodoGroup";
import styled from "styled-components";

export type TodoItem = {
	id: number;
	title: string;
	checked: boolean;
	category_id: number;
};

export interface TodoCategory {
	created_at: string;
	description: string;
	id: number;
	name: string;
	updated_at: string;
}

type Props = {
	todoItems: TodoItem[];
	categories: TodoCategory[];
};

function getItemsByCategory(items: TodoItem[], categoryId: number) {
	return items.filter((item) => item.category_id === categoryId);
}

const TodoList: React.FC<Props> = ({ todoItems, categories }) => {
	useEffect(() => {
		const token = document.querySelector(
			"[name=csrf-token]"
		) as HTMLMetaElement;
		axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
	}, []);

	return (
		<Container>
			<h3>2022 Wish List</h3>
			<GroupContainer>
				{categories.map((category, index) => {
					return (
						<TodoGroup
							key={index}
							todoItems={getItemsByCategory(
								todoItems,
								category.id
							)}
							category={category}
						/>
					);
				})}
			</GroupContainer>
		</Container>
	);
};

const GroupContainer = styled.section`
	display: grid;
	grid-auto-flow: row;
	grid-gap: 1rem;
	grid-auto-rows: max-content;
`;
export default TodoList;
