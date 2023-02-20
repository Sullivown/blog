import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { postComment, putComment } from '../api/comment';
import UserContext from '../context/userContext';

import Form from '../elements/Form';
import Button from '../elements/Button';

const StyledCommentFormContainer = styled.div``;

function CommentForm(props) {
	const currentUser = useContext(UserContext);
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState(
		props.comment ? { content: props.comment.content } : { content: '' }
	);
	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: () => {
			if (props.isBeingEdited) {
				return putComment({
					postId: props.post._id,
					commentId: props.comment._id,
					formData,
					currentUser,
				});
			} else {
				return postComment({
					postId: props.post._id,
					formData,
					currentUser,
				});
			}
		},
		onError: (error) => {
			console.log(error);
		},
		onSuccess: () => {
			setFormData({ content: '' });
			props.isBeingEdited && props.setIsBeingEdited(false);
			return queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	const handleChange = (event) => {
		const target = event.target;
		setFormData((prevData) => ({
			...prevData,
			[target.name]: target.value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		mutate();
	};

	return (
		<StyledCommentFormContainer>
			<Form onSubmit={handleSubmit}>
				<textarea
					id={props.post._id + '_add_comment_content'}
					name='content'
					value={formData.content}
					placeholder='Write comment'
					onChange={handleChange}
				></textarea>
				<Button disabled={isLoadingMutate}>
					{props.isBeingEdited ? 'Save' : 'Add Comment'}
				</Button>
			</Form>
		</StyledCommentFormContainer>
	);
}

export default CommentForm;
