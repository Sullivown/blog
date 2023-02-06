import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';

const StyledSignUpFormContainer = styled.div``;

const StyledSignUpForm = styled.form``;

function SignUpForm(props) {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [formErrors, setFormErrors] = useState([]);
	const user = useContext(UserContext);
	const navigate = useNavigate();

	const { mutate } = useMutation({
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
				throw new Error('Sign up unsuccessful');
			}
			return response.json();
		},
		onError: (error) => {
			setFormErrors([error.message]);
		},
		onSuccess: (data) => {
			props.setUser({ ...data.user, token: data.token });
			navigate('/dashboard');
		},
	});

	const handleChange = (event) => {
		const target = event.target;
		setFormData((prevData) => ({
			...prevData,
			[target.name]: target.value,
		}));
	};

	const handleLogoutClick = () => {
		props.setUser(null);
	};

	return (
		<StyledSignUpFormContainer>
			{formErrors.length > 0 && (
				<Messages messages={formErrors} messagesType='error' />
			)}
			{user ? (
				<>
					<p>'You are logged in!'</p>
					<button onClick={handleLogoutClick}>Log Out</button>
				</>
			) : (
				<StyledSignUpForm onSubmit={(event) => mutate(event)}>
					<label htmlFor='first_name'>First Name</label>
					<input
						id='first_name'
						type='text'
						name='first_name'
						value={formData.first_name}
						onChange={handleChange}
						required
					></input>
					<label htmlFor='last_name'>Last Name</label>
					<input
						id='last_name'
						type='last_name'
						name='last_name'
						value={formData.last_name}
						onChange={handleChange}
						required
					></input>
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
					<label htmlFor='password_confirm'>Confirm Password</label>
					<input
						id='password_confirm'
						type='password'
						name='password_confirm'
						autoComplete='off'
						value={formData.password_confirm}
						onChange={handleChange}
						required
					></input>
					<button type='submit'>Create Account</button>
				</StyledSignUpForm>
			)}
		</StyledSignUpFormContainer>
	);
}

export default SignUpForm;
