import React, { useEffect, useState } from 'react';
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
		</DashboardContainer>
	);
}

export default Home;
