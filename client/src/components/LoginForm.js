import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Messages from './Messages';

const StyledLoginFormContainer = styled.div``;

const StyledLoginForm = styled.form``;

function LoginForm() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [formErrors, setFormErrors] = useState([]);
	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation({
		mutationFn: async (event) => {
			event.preventDefault();
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/auth/login`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			);
			if (!response.ok) {
				throw new Error('Login unsuccessful');
			}
			return response.json();
		},
		onError: (error, variables) => {
			setFormErrors([error.message]);
		},
		onSuccess: (data, variables) => {
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
				<label>Email</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
				></input>
				<label>Password</label>
				<input
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
				></input>
				<button type='submit'>Login</button>
			</StyledLoginForm>
		</StyledLoginFormContainer>
	);
}

export default LoginForm;
