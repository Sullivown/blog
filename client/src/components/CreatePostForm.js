import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';

const StyledCreatePostFormContainer = styled.div``;

const StyledCreatePostForm = styled.form``;

function CreatePostForm(props) {
	const [formData, setFormData] = useState({ title: '', content: '' });
	const [formErrors, setFormErrors] = useState([]);
	const user = useContext(UserContext);
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: async (event) => {
			event.preventDefault();
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/posts`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			if (!response.ok) {
				throw new Error('Post creation unsuccessful');
			}
			return response.json();
		},
		onError: (error, variables) => {
			setFormErrors([error.message]);
		},
		onSuccess: (data, variables) => {
			console.log('Post created successfully ' + JSON.stringify(data));
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
		<StyledCreatePostFormContainer>
			{formErrors.length > 0 && (
				<Messages messages={formErrors} messagesType='error' />
			)}

			<StyledCreatePostForm onSubmit={(event) => mutate(event)}>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
				></input>
				<label htmlFor='content'>Content</label>
				<textarea
					id='content'
					name='content'
					value={formData.content}
					onChange={handleChange}
				></textarea>
				<label htmlFor='status'>status</label>
				<input
					id='status'
					type='text'
					name='status'
					value={formData.status}
					onChange={handleChange}
				></input>
				<button type='submit'>Create Post</button>
			</StyledCreatePostForm>
		</StyledCreatePostFormContainer>
	);
}

export default CreatePostForm;
