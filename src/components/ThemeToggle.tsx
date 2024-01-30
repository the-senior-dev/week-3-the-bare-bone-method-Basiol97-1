import React, { useContext } from 'react';
import styled from "styled-components";
import { DarkModeContext } from '../store/context';


const ThemeToggle = () => {
	const { toggleTheme } = useContext(DarkModeContext);

	return (
		<ToggleSwitchContainer> {/* */}
			<ToggleSwitchInput onClick={toggleTheme} />
			<ToggleSwitchSlider />
		</ToggleSwitchContainer>
	);
};

export default ThemeToggle;


const ToggleSwitchContainer = styled.label`
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
`;

const ToggleSwitchSlider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	transition: 0.4s;
	border-radius: 34px;

	&:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}
`;

const ToggleSwitchInput = styled.input.attrs({ type: "checkbox" })`
	opacity: 0;
	width: 0;
	height: 0;

	&:checked + ${ToggleSwitchSlider} {
		background-color: #2196f3;
	}

	&:focus + ${ToggleSwitchSlider} {
		box-shadow: 0 0 1px #2196f3;
	}

	&:checked + ${ToggleSwitchSlider}:before {
		transform: translateX(26px);
	}
`;
