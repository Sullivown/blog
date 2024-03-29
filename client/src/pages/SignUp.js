import React from 'react';
import styled from 'styled-components';

import UserForm from '../components/UserForm';

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function SignUp() {
	const formSettings = { isEdit: false, isOwn: false };
	return (
		<SignUpContainer>
			<h1>Sign Up</h1>
			<UserForm settings={formSettings} />
		</SignUpContainer>
	);
}

export default SignUp;
