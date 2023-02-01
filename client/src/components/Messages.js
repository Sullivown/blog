import React from 'react';
import styled from 'styled-components';

const StyledMessagesContainer = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	border: 1px solid black;
	border-radius: 5px;
`;

const StyledMessage = styled.div`
	background-color: ${(props) => (props.type === 'error' ? 'red' : 'green')};
	border: 1px solid ${(props) => (props.type === 'error' ? 'red' : 'green')};
	color: black;
	padding: 15px;
`;

function Messages(props) {
	const messageElements = props.messages.map((message) => (
		<StyledMessage type={message.type}>{message.message}</StyledMessage>
	));

	return <StyledMessagesContainer>{messageElements}</StyledMessagesContainer>;
}

export default Messages;
