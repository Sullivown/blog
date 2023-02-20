import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.text};
	font-size: 1rem;
	border: none;
	padding: 15px 25px;
	width: auto;
	border-radius: 15px;
	max-width: max-content;
	&:hover {
		cursor: pointer;
	}
	&:active {
		box-shadow: inset 1px 1px 10px #242d57;
	}
`;

export default StyledButton;
