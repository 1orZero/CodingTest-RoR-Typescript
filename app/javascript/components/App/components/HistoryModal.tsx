import React, { useEffect, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { AddButton } from "../uiComponent";
import { TodoItem } from "../../../reducers/todoReducer";
import styled from "styled-components";
import dayjs from "dayjs";
import TodoAPI from "../../../api/TodoAPI";

dayjs.extend(require("dayjs/plugin/localizedFormat"));
interface HistoryModalProps {
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

const historyModal: React.FC<HistoryModalProps> = ({
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
		const originalContent = selectedTodo.content;
		if (selectedRecord.content !== originalContent) {
			const data = await TodoAPI.addHistory(
				selectedTodo.id,
				selectedRecord.content
			);
			if (data) {
				onAddSuccess(data);
			}
		}

		onHide();
	};
	const isActiveStyle = (record: HistoryRecord) => {
		return selectedRecord && selectedRecord.id === record.id
			? {
					backgroundColor: "rgba(0,0,0,0.1)",
			  }
			: {};
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
								style={isActiveStyle(record)}
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
										{`history_id: ${record.id}`}
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
	grid-template-columns: minmax(270px, 1.5fr) 5fr;
	column-gap: 1rem;
`;
const ContentContainer = styled.div`
	padding: 0.5rem 1rem;
	height: 100%;
	border: 1px solid rgba(0, 0, 0, 0.125);
	border-radius: 0.25rem;
`;
