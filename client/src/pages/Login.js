import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UserContext from '../context/userContext';

import LoginForm from '../components/LoginForm';

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 25px;
`;

const StyledDiv = styled.div`
	text-align: center;
`;

function Login(props) {
	const user = useContext(UserContext);

	return (
		<LoginContainer>
			<h1>Login</h1>
			<LoginForm setUser={props.setUser} />
			{!user && (
				<StyledDiv>
					<p>Don't have an an account?</p>
					<Link to='/signup'>Create an account here.</Link>
				</StyledDiv>
			)}
		</LoginContainer>
	);
}

export default Login;
