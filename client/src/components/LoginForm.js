import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Messages from './Messages';
import { postLogin } from '../api/auth';

const StyledLoginFormContainer = styled.div``;

const StyledLoginForm = styled.form``;

function LoginForm(props) {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [formErrors, setFormErrors] = useState([]);
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: (event) => {
			event.preventDefault();
			return postLogin(formData);
		},
		onError: (error) => {
			setFormErrors([error.message]);
		},
		onSuccess: (data) => {
			props.setUser({ ...data.user, token: data.token });
			navigate('/');
		},
	});

	const handleChange = (event) => {
		const target = event.target;
		setFormData((prevData) => ({
			...prevData,
			[target.name]: target.value,
		}));
	};

	return (
		<StyledLoginFormContainer>
			{formErrors.length > 0 && (
				<Messages messages={formErrors} messagesType='error' />
			)}

			<StyledLoginForm onSubmit={(event) => mutate(event)}>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
				></input>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='password'
					name='password'
					autoComplete='off'
					value={formData.password}
					onChange={handleChange}
					required
				></input>
				<button type='submit'>Login</button>
			</StyledLoginForm>
		</StyledLoginFormContainer>
	);
}

export default LoginForm;
