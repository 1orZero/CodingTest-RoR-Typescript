import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ListGroup, Modal } from "react-bootstrap";
import { AddButton } from "../uiComponent";
import { TodoItem } from "../../../reducers/todoReducer";
import styled from "styled-components";
import dayjs from "dayjs";
import TodoAPI from "../../../api/TodoAPI";
import { shallowEqual, useDispatch } from "react-redux";
import { updateTodoItems } from "../../../actions/todoAction";
import { useSelector } from "react-redux";

dayjs.extend(require("dayjs/plugin/localizedFormat"));
interface NewTodoModalProps {
	show: boolean;
	selectedTodo: TodoItem;
	onHide: () => void;
	onAddSuccess: (newData: TodoItem[]) => void;
}
export interface HistoryRecord {
	id: number;
	content: string;
	created_at: Date;
	updated_at: Date;
	todo_id: number;
}

const historyModal: React.FC<NewTodoModalProps> = ({
	show,
	selectedTodo,
	onHide,
	onAddSuccess,
}) => {
	const [recordList, setRecordList] = useState([] as HistoryRecord[]);
	const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(
		null
	);

	useEffect(() => {
		if (show) {
			TodoAPI.getHistoryById(selectedTodo.id)
				.then((data) => {
					if (data && data.length > 0) {
						setRecordList(data);
						setSelectedRecord(data[0]);
						return;
					}
					setRecordList([]);
				})
				.catch(() => {
					setRecordList([]);
				});
		}
	}, [show]);

	const revertContent = async () => {
		const data = await TodoAPI.addHistory(
			selectedTodo.id,
			selectedRecord.content
		);
		if (data) {
			onAddSuccess([...data]);
		}
		onHide();
	};

	return (
		<Modal size="xl" show={show} onHide={onHide} scrollable>
			<Modal.Header closeButton>
				<Modal.Title>History</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<ListGroup as="ul">
						{recordList.map((record, index) => (
							<ListGroup.Item
								as="li"
								className="d-flex justify-content-between align-items-start"
								action
								key={index}
								onClick={() => setSelectedRecord(record)}
							>
								<div className="ms-2 me-auto">
									<div style={{ fontSize: "15px" }}>
										{dayjs(record.created_at).format(
											"LLLL"
										)}
									</div>
									<small className="text-muted">
										{record.id}
									</small>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
					<ContentContainer>
						{selectedRecord?.content}
					</ContentContainer>
				</Container>
				<AddButton onClick={revertContent}>
					Revert to this version
				</AddButton>
			</Modal.Body>
		</Modal>
	);
};
export default historyModal;

const Container = styled.section`
	display: grid;
	grid-template-columns: minmax(253px, 1.5fr) 5fr;
	column-gap: 1rem;
`;
const ContentContainer = styled.div`
	padding: 0.5rem 1rem;
	height: 100%;
	border: 1px solid rgba(0, 0, 0, 0.125);
	border-radius: 0.25rem;
`;
