import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Form, Modal } from "react-bootstrap";
import { AddButton } from "../uiComponent";
import { TodoItem } from "../../../reducers/todoReducer";

interface NewTodoModalProps {
	show: boolean;
	category_id: number;
	onHide: () => void;
	onAddSuccess: (newData: TodoItem[]) => void;
}
const AddNewTodoModal: React.FC<NewTodoModalProps> = ({
	show,
	category_id,
	onHide,
	onAddSuccess,
}) => {
	const [title, setTitle] = useState("");
	const addNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = (await axios.post("/add", {
			content: title,
			checked: false,
			category_id,
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
export default AddNewTodoModal;
