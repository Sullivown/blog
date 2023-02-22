import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';

import Messages from './Messages';
import Form from '../elements/Form';
import Button from '../elements/Button';
import { postLogin } from '../api/auth';

const StyledLoginFormContainer = styled.div``;

function LoginForm(props) {
	const navigate = useNavigate();
	const location = useLocation();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [messages, setMessages] = useState(location.state?.messages || []);

	const { mutate } = useMutation({
		mutationFn: (event) => {
			event.preventDefault();
			return postLogin(formData);
		},
		onError: (error) => {
			setMessages([{ message: error.message, type: 'error' }]);
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
			{messages.length > 0 && (
				<Messages messages={messages} messagesType='error' />
			)}

			<Form onSubmit={(event) => mutate(event)}>
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
				<Button type='submit'>Login</Button>
			</Form>
		</StyledLoginFormContainer>
	);
}

export default LoginForm;
