import React from 'react';
import styled from 'styled-components';
import UserForm from '../../../components/UserForm';

const CreateUserContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function CreateUser() {
	const formSettings = { isEdit: false, isOwn: false };
	return (
		<CreateUserContainer>
			<h1>Create User</h1>
			<UserForm settings={formSettings} />
		</CreateUserContainer>
	);
}

export default CreateUser;
