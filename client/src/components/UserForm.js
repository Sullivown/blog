import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';
import { postUser, putUser } from '../api/user';

const StyledUserFormContainer = styled.div``;

const StyledUserForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

function UserForm(props) {
	const currentUser = useContext(UserContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [formData, setFormData] = useState(
		props.user || {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			password_confirm: '',
			admin: false,
		}
	);
	const { isEdit, isOwn } = props.settings;

	const {
		mutate,
		isLoading: isLoadingMutate,
		error,
	} = useMutation({
		mutationFn: async (event) => {
			event.preventDefault();
			setMessages([]);
			if (!isEdit && (!isOwn || currentUser.admin)) {
				return postUser({ formData });
			} else {
				return putUser({
					userId: id || currentUser.id,
					formData,
					currentUser,
				});
			}
		},
		onError: (error) => {
			setMessages([error.message]);
		},
		onSuccess: (mutateData) => {
			if (mutateData.errors) {
				const errors = mutateData.errors.map((errorMessage) => ({
					...errorMessage,
					type: 'error',
				}));
				setMessages(errors);
				return;
			}
			// New account created by new user
			if (!isEdit && !currentUser) {
				navigate(`/login`, {
					state: {
						messages: [
							{
								message: 'Account created successfully!',
								type: 'success',
							},
						],
					},
				});
			}

			// New account created by admin
			else if (!isEdit && currentUser?.admin) {
				setMessages([
					{
						message: 'User created successfully!',
						type: 'success',
						link: {
							url: `/users/${mutateData.user._id}`,
							text: 'View user profile',
						},
					},
				]);
			}

			// Own account edited by currentUser
			else if (isEdit && isOwn) {
				// Update localStorage user details
				props.setUser((prevData) => ({
					...prevData,
					...mutateData.user,
				}));
				setMessages([
					{
						message: 'Account settings edited successfully!',
						type: 'success',
						link: {
							url: `/users/${mutateData.user._id}`,
							text: 'View profile',
						},
					},
				]);
			}

			// Other user account edited by admin
			else if (isEdit) {
				setMessages([
					{
						message: 'User edited successfully!',
						type: 'success',
						link: {
							url: `/users/${mutateData.user._id}`,
							text: 'View profile',
						},
					},
				]);
			}
		},
	});

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<StyledUserFormContainer>
			{messages.length > 0 && <Messages messages={messages} />}
			<StyledUserForm onSubmit={(event) => mutate(event)}>
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
					type='text'
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
					required={!isOwn && !currentUser?.admin}
				></input>
				<label htmlFor='password_confirm'>Confirm Password</label>
				<input
					id='password_confirm'
					type='password'
					name='password_confirm'
					autoComplete='off'
					value={formData.password_confirm}
					onChange={handleChange}
					required={!isOwn && !currentUser?.admin}
				></input>
				{currentUser?.admin && (
					<>
						<label htmlFor='admin'>Admin</label>
						<input
							type='checkbox'
							id='admin'
							name='admin'
							checked={formData.admin}
							onChange={handleChange}
						/>
					</>
				)}
				<button type='submit' disabled={isLoadingMutate}>
					{isEdit ? 'Update Details' : 'Create Account'}
				</button>
			</StyledUserForm>
		</StyledUserFormContainer>
	);
}

export default UserForm;
