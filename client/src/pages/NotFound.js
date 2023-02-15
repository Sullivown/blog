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
			<h1>NotFound</h1>
		</NotFoundContainer>
	);
}

export default NotFound;
