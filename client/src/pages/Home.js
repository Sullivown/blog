import React, { useContext } from 'react';
import styled from 'styled-components';

import UserContext from '../context/userContext';

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Home() {
	const user = useContext(UserContext);

	return (
		<HomeContainer>
			<h1>Home</h1>
			<p>{user?.first_name}</p>
		</HomeContainer>
	);
}

export default Home;
