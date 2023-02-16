import React from 'react';
import styled from 'styled-components';
import UserForm from '../../components/UserForm';

const AccountContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Account(props) {
	const formSettings = { isEdit: true, isOwn: true };
	return (
		<AccountContainer>
			<h1>Account Settings</h1>
			<UserForm setUser={props.setUser} settings={formSettings} />
		</AccountContainer>
	);
}

export default Account;
