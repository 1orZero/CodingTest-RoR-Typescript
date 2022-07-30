import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Form, Modal } from "react-bootstrap";
import { AddButton } from "../uiComponent";
import { RootState } from "../../../reducers/store";
import { TodoCategory, TodoItem } from "../../../reducers/todoReducer";
import { updateCategories } from "../../../actions/todoAction";
import { useDispatch } from "react-redux";

interface NewTodoModalProps {
	show: boolean;
	onHide: () => void;
}
const AddNewCategoryModal: React.FC<NewTodoModalProps> = ({ show, onHide }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const addNewCategory = async () => {
		const res = (await axios.post("/addCategory", {
			name: title,
		})) as AxiosResponse<TodoCategory[]>;
		if (res.status === 200) {
			dispatch(updateCategories(res.data));
			onHide();
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add new category</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={addNewCategory}>
					<Form.Group className="mb-3" controlId="formGroupEmail">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter Category title"
						/>
					</Form.Group>
					<AddButton onClick={addNewCategory}>Add</AddButton>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default AddNewCategoryModal;
