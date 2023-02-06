import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';
import { postUser, putUser } from '../api/user';

const StyledSignUpFormContainer = styled.div``;

const StyledSignUpForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

function SignUpForm(props) {
	const user = useContext(UserContext);
	const [messages, setMessages] = useState([]);
	const [formData, setFormData] = useState(
		user
			? { ...user, password: '', password_confirm: '' }
			: {
					first_name: '',
					last_name: '',
					email: '',
					password: '',
					password_confirm: '',
			  }
	);

	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: async (event) => {
			event.preventDefault();
			setMessages([]);
			if (!user) {
				return postUser(formData, user);
			} else {
				return putUser(user._id, formData, user);
			}
		},
		onError: (error) => {
			setMessages([error.message]);
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

	return (
		<StyledSignUpFormContainer>
			{messages.length > 0 && (
				<Messages messages={messages} messagesType='error' />
			)}
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
				<button type='submit'>
					{user ? 'Update Details' : 'Create Account'}
				</button>
			</StyledSignUpForm>
		</StyledSignUpFormContainer>
	);
}

export default SignUpForm;
