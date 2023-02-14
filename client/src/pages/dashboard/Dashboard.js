import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../../page-sections/header/Header';

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Home() {
	return (
		<DashboardContainer>
			<h1>Dashboard</h1>
			<Header />
			<Outlet />
		</DashboardContainer>
	);
}

export default Home;
