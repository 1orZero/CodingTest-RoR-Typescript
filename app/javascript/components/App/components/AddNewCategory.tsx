import React from "react";
import { Plus, PlusCircleDotted } from "react-bootstrap-icons";
import styled from "styled-components";
import AddNewCategoryModal from "./AddNewCategoryModal";

const AddNewCategory = () => {
	const [isHover, setIsHover] = React.useState(false);
	const [showModal, setShowModal] = React.useState(false);

	const handler = () => {
		setIsHover(false);
		setShowModal(true);
	};
	return (
		<>
			<AddButton
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={handler}
			>
				{isHover ? (
					<PlusCircleDotted
						color={"black"}
						height={50}
						width={50}
					></PlusCircleDotted>
				) : (
					<Plus color={"#ccc"} height={50} width={50}></Plus>
				)}
			</AddButton>
			<aside>
				<AddNewCategoryModal
					show={showModal}
					onHide={() => setShowModal(false)}
				/>
			</aside>
		</>
	);
};
export default AddNewCategory;

const AddButton = styled.button`
	background-color: #fff;
	border: 1px dashed #ccc;
	border-radius: 10px;
	color: #000;
	cursor: pointer;
	padding: 5px 10px;

	&:hover {
		border: 1px dashed #000;
	}
`;
