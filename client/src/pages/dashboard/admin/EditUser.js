import React from 'react';
import styled from 'styled-components';
import UserForm from '../../../components/UserForm';

const EditUserContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function EditUser() {
	const formSettings = { isEdit: true, isOwn: false };
	return (
		<EditUserContainer>
			<h1>Edit User</h1>
			<UserForm settings={formSettings} />
		</EditUserContainer>
	);
}

export default EditUser;
