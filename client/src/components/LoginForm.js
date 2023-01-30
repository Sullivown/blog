import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';

const StyledLoginForm = styled.form``;

function LoginForm() {
	const [formData, setFormData] = useState({ email: '', password: '' });

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
				throw new Error('Network response was not ok');
			}
			return response.json();
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
	);
}

export default LoginForm;
