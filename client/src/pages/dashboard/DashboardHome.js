import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../context/userContext';

const DashboardHomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

function DashboardHome(props) {
	const currentUser = useContext(UserContext);

	return (
		<DashboardHomeContainer>
			<h2>Welcome to your dashboard, {currentUser.first_name}!</h2>
			<p>
				From here you can create and manage your posts and edit your
				account settings.
			</p>
		</DashboardHomeContainer>
	);
}

export default DashboardHome;
