import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Modal } from "react-bootstrap";
import { AddButton } from "../uiComponent";

interface NewTodoModalProps {
	show: boolean;
	// category_id: number;
	onHide: () => void;
	// onAddSuccess: (newData: TodoItem[]) => void;
}
const historyModal: React.FC<NewTodoModalProps> = ({
	show,
	// category_id,
	onHide,
	// onAddSuccess,
}) => {
	const [title, setTitle] = useState("");
	const addNewTodo = async () => {
		// const res = (await axios.post("/add", {
		// 	title,
		// 	checked: false,
		// 	category_id,
		// })) as AxiosResponse<TodoItem[]>;
		// if (res.status === 200) {
		// 	onAddSuccess(res.data);
		// }
	};

	return (
		<Modal size="xl" show={show} onHide={onHide}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<div style={{ width: "1000px" }}>123</div>
			</Modal.Body>
		</Modal>
	);
};
export default historyModal;
