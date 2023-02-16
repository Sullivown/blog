import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

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
	const messageElements = props.messages.map((message, index) => (
		<StyledMessage key={'message' + index} type={message.type}>
			{message.message || message.msg + ' '}
			{message.link && (
				<Link to={message.link.url}>{message.link.text}</Link>
			)}
		</StyledMessage>
	));

	return <StyledMessagesContainer>{messageElements}</StyledMessagesContainer>;
}

export default Messages;
