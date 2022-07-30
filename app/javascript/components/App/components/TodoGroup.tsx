import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { FolderMinus } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCategories, updateTodoItems } from "../../../actions/todoAction";
import { TodoCategory, TodoItem } from "../../../reducers/todoReducer";
import { AddButton, ResetButton } from "../uiComponent";
import AddNewTodoModal from "./AddNewTodoModal";
import HistoryModal from "./HistoryModal";

const TodoGroup: React.FC<{
	todoItems: TodoItem[];
	category: TodoCategory;
}> = ({ todoItems, category }) => {
	const dispatch = useDispatch();
	const [showAdd, setShowAdd] = useState(false);
	const [showHistory, setShowHistory] = useState(false);

	const handleShow = () => setShowAdd(true);
	const handleClose = () => setShowAdd(false);

	const toggleCheckState = async (
		e: React.ChangeEvent<HTMLInputElement>,
		todoItemId: number
	) => {
		const res = (await axios.post("/todo", {
			id: todoItemId,
			checked: e.target.checked,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			dispatch(updateTodoItems(res.data));
		}
	};
	const delItem = async (id: number) => {
		const res = (await axios.post("/del", {
			id,
			category_id: category.id,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			dispatch(updateTodoItems(res.data));
		}
	};
	const resetButtonOnClick = async () => {
		const res = (await axios.post("/reset", {
			category_id: category.id,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			dispatch(updateTodoItems(res.data));
		}
	};
	const handleAddSuccess = (newData: TodoItem[]) => {
		handleClose();
		dispatch(updateTodoItems(newData));
	};
	const delCategory = async () => {
		const res = (await axios.post("/delCategory", {
			id: category.id,
		})) as AxiosResponse<TodoCategory[]>;
		if (res.status === 200) {
			dispatch(updateCategories(res.data));
		}
	};
	const openHistoryModal = (todoId: number) => {
		setShowHistory(true);
	};

	return (
		<>
			<ListGroup>
				<ListGroup.Item active>
					<TodoTitleContainer>
						<label>{category.name}</label>
						<ButtonStyle onClick={delCategory}>
							<FolderMinus></FolderMinus>
						</ButtonStyle>
					</TodoTitleContainer>
				</ListGroup.Item>
				{todoItems.length > 0 ? (
					todoItems.map((todo) => (
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
									className="text-primary"
									style={{ cursor: "pointer" }}
									onClick={() => openHistoryModal(todo.id)}
								>
									HISTORY
								</label>
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
					show={showAdd}
					onHide={handleClose}
					category_id={category.id}
					onAddSuccess={handleAddSuccess}
				></AddNewTodoModal>
				<HistoryModal
					show={showHistory}
					onHide={() => setShowHistory(false)}
				></HistoryModal>
			</aside>
		</>
	);
};
export default TodoGroup;

const TodoItemContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr auto auto;
	align-items: center;
	column-gap: 10px;
`;
const ButtonContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
`;

const TodoTitleContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	column-gap: 10px;
`;

const ButtonStyle = styled.div`
	cursor: pointer;
`;
