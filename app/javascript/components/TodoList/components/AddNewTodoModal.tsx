import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { TodoItem } from "..";
import { Form, Modal } from "react-bootstrap";
import { AddButton } from "../uiComponent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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
	const addNewTodo = async () => {
		const res = (await axios.post("/add", {
			title,
			checked: false,
			category_id,
		})) as AxiosResponse<TodoItem[]>;
		if (res.status === 200) {
			onAddSuccess(res.data);
		}
	};

	const count = useSelector<number, number>((state) => state);
	const dispatch = useDispatch();
	const increase = () => {
		dispatch({ type: "INCREMENT", payload: 1 });
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add new Todo</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{count}
				<button onClick={increase}> Add </button>
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
