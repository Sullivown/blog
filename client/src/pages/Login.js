import React from 'react';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Login() {
	return (
		<LoginContainer>
			<h1>Login</h1>
			<LoginForm />
		</LoginContainer>
	);
}

export default Login;
