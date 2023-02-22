import React, { useContext } from 'react';
import styled from 'styled-components';

import UserContext from '../context/userContext';

import FeaturesGrid from '../components/FeaturesGrid';
import Link from '../elements/Link';

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-height: 80vh;
`;

const CallToAction = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 15px;
	border: 1px solid ${(props) => props.theme.secondary};
	border-radius: 15px;
	padding: 30px;
	margin-top: 50px;
	font-size: 1.5rem;
	text-align: center;
	width: 80%;
`;

function Home() {
	const user = useContext(UserContext);

	return (
		<HomeContainer>
			<h1>Community Blog</h1>
			<h2>Hello! Welcome to Community Blog.</h2>
			<p>A (can you guess?) community blogging/journaling app.</p>
			<FeaturesGrid />
			<CallToAction>
				Want to get invloved?
				<Link to='signup'>Sign up!</Link>
			</CallToAction>
		</HomeContainer>
	);
}

export default Home;
