import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UserContext from '../context/userContext';

import LoginForm from '../components/LoginForm';

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledDiv = styled.div``;

function Login(props) {
	const user = useContext(UserContext);

	return (
		<LoginContainer>
			<h1>Login</h1>
			<LoginForm setUser={props.setUser} />
			{!user && (
				<StyledDiv>
					<p>
						Don't have an an account?{' '}
						<Link to='/signup'>Create an account here.</Link>
					</p>
				</StyledDiv>
			)}
		</LoginContainer>
	);
}

export default Login;
