import React from 'react';
import styled from 'styled-components';
import SignUpForm from '../../components/SignUpForm';

const AccountContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Account() {
	return (
		<AccountContainer>
			<h1>Account Settings</h1>
			<SignUpForm edit={true} />
		</AccountContainer>
	);
}

export default Account;
