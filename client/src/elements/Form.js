import styled from 'styled-components';

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;

	> textarea,
	input,
	select {
		border: 1px solid ${(props) => props.theme.secondary};
		background-color: ${(props) => props.theme.bg};
		color: ${(props) => props.theme.text};
		padding: 5px;
	}
`;

export default StyledForm;
