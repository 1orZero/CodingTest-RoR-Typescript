import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateTodoItems } from "../../../actions/todoAction";
import TodoAPI from "../../../api/TodoAPI";
import { TodoItem } from "../../../reducers/todoReducer";

interface Props {
	todoItem: TodoItem;
}

const EditContent: React.FC<Props> = ({ todoItem }) => {
	const [showEdit, setShowEdit] = useState(false);
	const [content, setContent] = useState(todoItem.content);

	useEffect(() => {
		setContent(todoItem.content);
	}, [todoItem]);

	const dispatch = useDispatch();
	const updateContent = async (e?: React.FormEvent<HTMLFormElement>) => {
		if (e) e.preventDefault();

		if (content !== todoItem.content) {
			const res = await TodoAPI.addHistory(todoItem.id, content);

			if (res) {
				dispatch(updateTodoItems(res));
			}
		}

		setShowEdit(false);
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
