import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';
import { getUser, postUser, putUser } from '../api/user';

const StyledUserFormContainer = styled.div``;

const StyledUserForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

function UserForm(props) {
	const currentUser = useContext(UserContext);
	const location = useLocation();
	const { id } = useParams();
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password_confirm: '',
	});
	const isOwnAccount = location.pathname.includes('/dashboard/account');

	const { error } = useQuery({
		queryKey: ['users', id || currentUser.id],
		enabled: id || isOwnAccount ? true : false,
		queryFn: () => getUser(id || currentUser.id),
		onSuccess: (data) => {
			setFormData((prevFormData) => ({ ...prevFormData, ...data.user }));
		},
	});

	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: async (event) => {
			event.preventDefault();
			setMessages([]);
			if (!id && (!isOwnAccount || currentUser.admin)) {
				return postUser(formData);
			} else {
				return putUser(id || currentUser.id, formData, currentUser);
			}
		},
		onError: (error) => {
			setMessages([error.message]);
		},
		onSuccess: (mutateData) => {
			// New account created by new user
			if (!id && !currentUser) {
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
			if (!id && currentUser?.admin) {
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
			if (!id && isOwnAccount) {
				// Update localStoarge user details
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
			if (id) {
				setMessages([
					{
						message: 'User edited successfully!',
						type: 'success',
						link: {
							url: `/users/${mutateData.post._id}`,
							text: 'View profile',
						},
					},
				]);
			}
		},
	});

	const handleChange = (event) => {
		const target = event.target;
		setFormData((prevData) => ({
			...prevData,
			[target.name]: target.value,
		}));
	};

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<StyledUserFormContainer>
			{messages.length > 0 && (
				<Messages messages={messages} messagesType='error' />
			)}
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
					required={!isOwnAccount && !currentUser.admin}
				></input>
				<label htmlFor='password_confirm'>Confirm Password</label>
				<input
					id='password_confirm'
					type='password'
					name='password_confirm'
					autoComplete='off'
					value={formData.password_confirm}
					onChange={handleChange}
					required={!isOwnAccount && !currentUser.admin}
				></input>
				<button type='submit' disabled={isLoadingMutate}>
					{currentUser ? 'Update Details' : 'Create Account'}
				</button>
			</StyledUserForm>
		</StyledUserFormContainer>
	);
}

export default UserForm;
