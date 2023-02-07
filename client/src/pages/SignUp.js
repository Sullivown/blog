import React from 'react';
import styled from 'styled-components';

import UserForm from '../components/UserForm';

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function SignUp(props) {
	return (
		<SignUpContainer>
			<h1>Sign Up</h1>
			<UserForm />
		</SignUpContainer>
	);
}

export default SignUp;
