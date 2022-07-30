import React, { useEffect } from "react";
import TodoGroup from "./components/TodoGroup";
import styled from "styled-components";

import { TodoCategory, TodoItem, TodoState } from "../../reducers/todoReducer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import { updateCategories, updateTodoItems } from "../../actions/todoAction";

type Props = {
	todoItems: TodoItem[];
	categories: TodoCategory[];
};

function getItemsByCategory(items: TodoItem[], categoryId: number) {
	return items.filter((item) => item.category_id === categoryId);
}

const TodoList: React.FC<Props> = ({ todoItems, categories }) => {
	const storeTodo = useSelector<RootState, TodoState>(
		(state) => state.todo,
		shallowEqual
	);

	const dispatch = useDispatch();

	useEffect(() => {
		// Apply Data to Store
		dispatch(updateTodoItems(todoItems));
		dispatch(updateCategories(categories));
	}, []);

	return (
		<GroupContainer>
			{storeTodo.categories.map((category, index) => {
				return (
					<TodoGroup
						key={index}
						todoItems={getItemsByCategory(
							storeTodo.todoItem,
							category.id
						)}
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
