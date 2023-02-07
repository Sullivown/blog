import React from 'react';
import styled from 'styled-components';
import UserForm from '../../components/UserForm';

const AccountContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Account() {
	return (
		<AccountContainer>
			<h1>Account Settings</h1>
			<UserForm />
		</AccountContainer>
	);
}

export default Account;
