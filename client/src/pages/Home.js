import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Home() {
	return (
		<HomeContainer>
			<h1>Home</h1>
		</HomeContainer>
	);
}

export default Home;
