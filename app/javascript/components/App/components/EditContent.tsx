import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateTodoItems } from "../../../actions/todoAction";
import { TodoItem } from "../../../reducers/todoReducer";

interface Props {
	todoItem: TodoItem;
}

const EditContent: React.FC<Props> = ({ todoItem }) => {
	const [showEdit, setShowEdit] = useState(false);
	const [content, setContent] = useState(todoItem.content);

	const dispatch = useDispatch();
	const updateContent = async (e?: React.FormEvent<HTMLFormElement>) => {
		if (e) e.preventDefault();

		if (content !== todoItem.content) {
			const res = (await axios.post("/addHistory", {
				id: todoItem.id,
				content,
			})) as AxiosResponse<TodoItem[]>;
			if (res.status === 200) {
				dispatch(updateTodoItems(res.data));
			}
		}

		setShowEdit(false);
	};
	const test = () => {
		console.log("onSubmit");
	};

	return showEdit ? (
		<Form onSubmit={updateContent}>
			<Form.Control
				onBlur={() => updateContent()}
				onChange={(e) => setContent(e.target.value)}
				type="text"
				size="sm"
				value={content}
			/>
		</Form>
	) : (
		<label onClick={() => setShowEdit(true)}>{content}</label>
	);
};
export default EditContent;
