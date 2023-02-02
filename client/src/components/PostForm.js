import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';

const StyledPostFormContainer = styled.div``;

const StyledPostForm = styled.form``;

function PostForm() {
	const location = useLocation();
	const queryClient = useQueryClient();
	const { post } = { ...location.state };
	const [formData, setFormData] = useState(
		post || {
			title: '',
			content: '',
			status: 'Draft',
		}
	);
	const [messages, setMessages] = useState([]);
	const user = useContext(UserContext);

	const { mutate, isLoading } = useMutation({
		mutationFn: async (event) => {
			event.preventDefault();
			setMessages([]);
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/posts${
					post ? '/' + post._id : ''
				}`,
				{
					method: post ? 'PUT' : 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			if (!response.ok) {
				throw new Error(
					`Post ${post ? 'edit' : 'creation'} unsuccessful`
				);
			}
			return response.json();
		},
		onError: (error) => {
			setMessages([{ message: error.message, type: 'error' }]);
		},
		onSuccess: (data) => {
			console.log(data);
			setMessages([
				{
					message: `Post ${
						post ? 'edited' : 'created'
					} successfully!`,
					type: 'success',
					link: {
						url: `/posts/${data.post._id}`,
						text: 'View Post',
					},
				},
			]);
			queryClient.setQueryData(['posts', data.post._id], data.post);
			queryClient.invalidateQueries(['posts'], { exact: true });
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
		<StyledPostFormContainer>
			{messages.length > 0 && <Messages messages={messages} />}

			<StyledPostForm onSubmit={(event) => mutate(event)}>
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
				<label htmlFor='status'>Status</label>
				<select
					id='status'
					name='status'
					value={formData.status}
					onChange={handleChange}
				>
					<option value='Draft'>Draft</option>
					<option value='Published'>Published</option>
				</select>
				<button type='submit' disabled={isLoading}>
					Save Post
				</button>
			</StyledPostForm>
		</StyledPostFormContainer>
	);
}

export default PostForm;
