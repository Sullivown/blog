import React from 'react';
import styled from 'styled-components';

import FeaturesGrid from '../components/FeaturesGrid';
import Link from '../elements/Link';

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-height: 80vh;
	text-align: center;
`;

const CallToAction = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 15px;
	background-color: ${(props) => props.theme.text};
	color: ${(props) => props.theme.bg};
	border-radius: 15px;
	padding: 30px;
	margin-top: 50px;
	font-size: 1.5rem;
	text-align: center;
	width: 80%;
`;

const CallToActionLink = styled(Link)`
	color: ${(props) => props.theme.bg};
`;

function Home() {
	return (
		<HomeContainer>
			<h1>Community Blog</h1>
			<h2>Hello! Welcome to Community Blog.</h2>
			<p>A (can you guess?) community blogging/journaling app.</p>
			<FeaturesGrid />
			<CallToAction>
				Want to get involved?
				<CallToActionLink to='signup'>Sign up!</CallToActionLink>
			</CallToAction>
		</HomeContainer>
	);
}

export default Home;
