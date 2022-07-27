import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form, Modal } from "react-bootstrap";
import { ResetButton, AddButton } from "./uiComponent";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";

type TodoItem = {
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

	const [todos, setTodos] = useState(todoItems);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const checkBoxOnCheck = async (
		e: React.ChangeEvent<HTMLInputElement>,
		todoItemId: number
	) => {
		const res = (await axios.post("/todo", {
			id: todoItemId,
			checked: e.target.checked,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			setTodos(res.data);
		}
	};

	const resetButtonOnClick = async () => {
		const res = (await axios.post("/reset")) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			setTodos(res.data);
		}
	};

	const delItem = async (id: number) => {
		const res = (await axios.post("/del", {
			id,
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
		<Container>
			<h3>2022 Wish List</h3>
			<ListGroup>
				{todos.map((todo) => (
					<ListGroup.Item key={todo.id}>
						<TodoItemContainer>
							<Form.Check
								type="checkbox"
								label={todo.title}
								checked={todo.checked}
								onChange={(e) => checkBoxOnCheck(e, todo.id)}
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
				))}
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
					onAddSuccess={handleAddSuccess}
				></AddNewTodoModal>
			</aside>
		</Container>
	);
};
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

export default TodoList;

const AddNewTodoModal = ({ show, onHide, onAddSuccess }) => {
	const [title, setTitle] = useState("");
	const addNewTodo = async () => {
		const res = (await axios.post("/add", {
			title,
			checked: false,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			onAddSuccess(res.data);
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add new Todo</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={addNewTodo}>
					<Form.Group className="mb-3" controlId="formGroupEmail">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter TODO title"
						/>
					</Form.Group>
					<AddButton onClick={addNewTodo}>Submit</AddButton>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
