import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

export const BaseButton = styled(Button)`
	margin-top: 1em;
`;
export const ResetButton = BaseButton;

export const AddButton = ({ onClick, children }) => {
	return (
		<BaseButton
			variant="success"
			onClick={onClick}
			style={{ width: "100%" }}
		>
			{children}
		</BaseButton>
	);
};
