import React from 'react';
import styled from 'styled-components';

import SignUpForm from '../components/SignUpForm';

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function SignUp(props) {
	return (
		<SignUpContainer>
			<h1>SignUp</h1>
			<SignUpForm />
		</SignUpContainer>
	);
}

export default SignUp;
