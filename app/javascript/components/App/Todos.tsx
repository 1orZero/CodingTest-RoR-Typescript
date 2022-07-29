import React, { useEffect } from "react";
import TodoGroup from "./components/TodoGroup";
import styled from "styled-components";

import { TodoCategory, TodoItem } from "../../reducers/todoReducer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../reducers/store";

type Props = {
	todoItems: TodoItem[];
	categories: TodoCategory[];
};

function getItemsByCategory(items: TodoItem[], categoryId: number) {
	return items.filter((item) => item.category_id === categoryId);
}

const TodoList: React.FC<Props> = ({ todoItems, categories }) => {
	// const storeTodos = useSelector((state: RootState) => state.todo.todoItems);
	const storeTodo = useSelector(
		(state: RootState) => state.todo,
		shallowEqual
	);

	const dispatch = useDispatch();

	useEffect(() => {
		// Apply Data to Store
		dispatch({ type: "SET_TODO_ITEMS", payload: todoItems });
		// console.log(storeCategories);
		dispatch({ type: "SET_CATEGORIES", payload: categories });
		// console.log(storeCategories);
		console.log("useEffect");
	}, []);

	return (
		<GroupContainer>
			{/* <div className="">{storeCount}</div> */}
			{storeTodo.categories.map((category, index) => {
				return (
					<TodoGroup
						key={index}
						todoItems={getItemsByCategory(todoItems, category.id)}
						category={category}
					/>
				);
			})}
		</GroupContainer>
	);
};

const GroupContainer = styled.section`
	display: grid;
	grid-auto-flow: row;
	grid-gap: 1rem;
	grid-auto-rows: max-content;
`;
export default TodoList;
