import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AdminContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Admin() {
	return (
		<AdminContainer>
			<h1>Admin</h1>
			<Outlet />
		</AdminContainer>
	);
}

export default Admin;
