import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { TodoCategory, TodoItem } from "..";
import { AddButton, ResetButton } from "../uiComponent";
import AddNewTodoModal from "./AddNewTodoModal";

const TodoGroup: React.FC<{
	todoItems: TodoItem[];
	category: TodoCategory;
}> = ({ todoItems, category }) => {
	const [todos, setTodos] = useState(todoItems);
	const [show, setShow] = useState(false);
	const delItem = async (id: number) => {
		const res = (await axios.post("/del", {
			id,
			category_id: category.id,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			setTodos(res.data);
		}
	};
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const toggleCheckState = async (
		e: React.ChangeEvent<HTMLInputElement>,
		todoItemId: number
	) => {
		const res = (await axios.post("/todo", {
			id: todoItemId,
			checked: e.target.checked,
			category_id: category.id,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			setTodos(res.data);
		}
	};
	const resetButtonOnClick = async () => {
		const res = (await axios.post("/reset", {
			category_id: category.id,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			setTodos(res.data);
		}
	};
	const handleAddSuccess = (newData: TodoItem[]) => {
		handleClose();
		setTodos(newData);
	};

	return (
		<>
			<ListGroup>
				<ListGroup.Item active>
					<label>{category.name}</label>
				</ListGroup.Item>
				{todos.length > 0 ? (
					todos.map((todo) => (
						<ListGroup.Item key={todo.id}>
							<TodoItemContainer>
								<Form.Check
									type="checkbox"
									label={todo.title}
									checked={todo.checked}
									onChange={(e) =>
										toggleCheckState(e, todo.id)
									}
								/>
								<label
									className="text-danger"
									style={{ cursor: "pointer" }}
									onClick={() => delItem(todo.id)}
								>
									DEL
								</label>
							</TodoItemContainer>
						</ListGroup.Item>
					))
				) : (
					<ListGroup.Item className="text-muted text-center">
						No todos yet
					</ListGroup.Item>
				)}
				<ButtonContainer>
					<AddButton onClick={handleShow}>Add</AddButton>
					<ResetButton onClick={resetButtonOnClick}>
						Reset
					</ResetButton>
				</ButtonContainer>
			</ListGroup>
			<aside>
				<AddNewTodoModal
					show={show}
					onHide={handleClose}
					category_id={category.id}
					onAddSuccess={handleAddSuccess}
				></AddNewTodoModal>
			</aside>
		</>
	);
};
export default TodoGroup;

const TodoItemContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	column-gap: 10px;
`;
const ButtonContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
`;
