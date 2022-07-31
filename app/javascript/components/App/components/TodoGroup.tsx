import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCategories, updateTodoItems } from "../../../actions/todoAction";
import TodoAPI from "../../../api/TodoAPI";
import { TodoCategory, TodoItem } from "../../../reducers/todoReducer";
import { AddButton, ResetButton } from "../uiComponent";
import AddNewTodoModal from "./AddNewTodoModal";
import EditContent from "./EditContent";
import HistoryModal from "./HistoryModal";

const TodoGroup: React.FC<{
	todoItems: TodoItem[];
	category: TodoCategory;
}> = ({ todoItems, category }) => {
	const dispatch = useDispatch();
	const [showAdd, setShowAdd] = useState(false);
	const [showHistory, setShowHistory] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

	const handleShow = () => setShowAdd(true);
	const handleClose = () => setShowAdd(false);

	const toggleCheckState = async (
		e: React.ChangeEvent<HTMLInputElement>,
		todoItemId: number
	) => {
		const data = await TodoAPI.updateCheckState(
			todoItemId,
			e.target.checked
		);

		if (data) dispatch(updateTodoItems(data));
	};
	const delItem = async (id: number) => {
		const data = await TodoAPI.deleteTodo(id, category.id);
		if (data) dispatch(updateTodoItems(data));
	};

	const resetButtonOnClick = async () => {
		const data = await TodoAPI.resetTodoByCategoryId(category.id);
		if (data) dispatch(updateTodoItems(data));
	};
	const handleAddSuccess = (newData: TodoItem[]) => {
		dispatch(updateTodoItems(newData));
	};
	const delCategory = async () => {
		const data = await TodoAPI.deleteCategory(category.id);
		if (data) dispatch(updateCategories(data));
	};
	const openHistoryModal = (todo: TodoItem) => {
		setSelectedTodo(todo);
		setShowHistory(true);
	};

	return (
		<>
			<ListGroup>
				<ListGroup.Item active>
					<TodoTitleContainer>
						<label>{category.name}</label>
						<ButtonStyle onClick={delCategory}>
							<Trash></Trash>
						</ButtonStyle>
					</TodoTitleContainer>
				</ListGroup.Item>
				{todoItems.length > 0 ? (
					todoItems.map((todo) => (
						<ListGroup.Item key={todo.id}>
							<TodoItemContainer>
								<section
									style={{
										display: "grid",
										columnGap: "10px",
										gridAutoFlow: "column",
										gridAutoColumns: "max-content",
									}}
								>
									<Form.Check
										type="checkbox"
										checked={todo.checked}
										onChange={(e) =>
											toggleCheckState(e, todo.id)
										}
									/>
									<EditContent todoItem={todo} />
								</section>

								<label
									className="text-primary fw-bold"
									style={{ cursor: "pointer" }}
									onClick={() => openHistoryModal(todo)}
								>
									HISTORY
								</label>
								<label
									className="fw-bold text-danger"
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
					selectedTodo={selectedTodo}
					onAddSuccess={handleAddSuccess}
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
