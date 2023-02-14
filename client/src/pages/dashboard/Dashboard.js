import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Home() {
	return (
		<DashboardContainer>
			<h1>Dashboard</h1>
			<Outlet />
		</DashboardContainer>
	);
}

export default Home;
