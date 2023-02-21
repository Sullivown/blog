import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/userContext';

import Messages from './Messages';
import { postPost, putPost } from '../api/post';

import Form from '../elements/Form';
import Button from '../elements/Button';

const StyledPostFormContainer = styled.div`
	width: 100%;
`;

function PostForm(props) {
	const currentUser = useContext(UserContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [formData, setFormData] = useState(
		props.post || {
			title: '',
			content: '',
			status: 'Draft',
		}
	);
	const [messages, setMessages] = useState(location.state?.messages || []);

	const {
		mutate,
		isLoading: isLoadingMutate,
		error,
	} = useMutation({
		mutationFn: (event) => {
			event.preventDefault();
			setMessages([]);
			if (!id) {
				return postPost({ formData, currentUser });
			} else {
				return putPost({ postId: id, formData, currentUser });
			}
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

			<Form onSubmit={(event) => mutate(event)}>
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
					rows='10'
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
				<Button type='submit' disabled={isLoadingMutate}>
					Save Post
				</Button>
			</Form>
		</StyledPostFormContainer>
	);
}

export default PostForm;
