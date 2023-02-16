import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function NotFound() {
	return (
		<NotFoundContainer>
			<h1>404 - Not Found</h1>
			<p>Whoops! It seems what you are looking for does not exist...</p>
		</NotFoundContainer>
	);
}

export default NotFound;
