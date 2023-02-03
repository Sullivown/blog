import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';

const StyledPostFormContainer = styled.div``;

const StyledPostForm = styled.form``;

function PostForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	const [formData, setFormData] = useState({
		title: '',
		content: '',
		status: 'Draft',
	});
	const [messages, setMessages] = useState(location.state?.messages || []);
	console.log(messages);
	const user = useContext(UserContext);

	const { error } = useQuery({
		queryKey: ['posts', id],
		enabled: id ? true : false,
		queryFn: async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		},
		onSuccess: (data) => {
			setFormData(data.post);
		},
	});

	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: async (event) => {
			event.preventDefault();
			setMessages([]);
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/posts${
					id ? '/' + id : ''
				}`,
				{
					method: id ? 'PUT' : 'POST',
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
					`Post ${id ? 'edit' : 'creation'} unsuccessful`
				);
			}
			return response.json();
		},
		onError: (error) => {
			setMessages([{ message: error.message, type: 'error' }]);
		},
		onSuccess: (mutateData) => {
			if (!id) {
				navigate(`/dashboard/posts/${mutateData.post._id}`, {
					state: {
						messages: [
							{
								message: 'Post created successfully!',
								type: 'success',
								link:
									mutateData.post.status === 'Published'
										? {
												url: `/posts/${mutateData.post._id}`,
												text: 'View Post',
										  }
										: null,
							},
						],
					},
				});
			} else {
				setMessages([
					{
						message: 'Post edited successfully!',
						type: 'success',
						link:
							mutateData.post.status === 'Published'
								? {
										url: `/posts/${mutateData.post._id}`,
										text: 'View Post',
								  }
								: null,
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
		<StyledPostFormContainer>
			{messages.length > 0 && <Messages messages={messages} />}

			<StyledPostForm onSubmit={(event) => mutate(event)}>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					placeholder='Post Title'
					value={formData.title}
					onChange={handleChange}
				></input>
				<label htmlFor='content'>Content</label>
				<textarea
					id='content'
					name='content'
					placeholder='Post Content'
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
				<button type='submit' disabled={isLoadingMutate}>
					Save Post
				</button>
			</StyledPostForm>
		</StyledPostFormContainer>
	);
}

export default PostForm;
