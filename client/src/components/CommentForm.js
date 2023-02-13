import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { postComment } from '../api/comment';
import UserContext from '../context/userContext';

const StyledCommentFormContainer = styled.div``;

const StyledCommentForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

function CommentForm(props) {
	const user = useContext(UserContext);
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState({ content: '' });
	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: postComment,
		onError: (error) => {
			console.log(error);
		},
		onSuccess: () => {
			setFormData({ content: '' });
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
		mutate({ postId: props.post._id, formData, user });
	};

	return (
		<StyledCommentFormContainer>
			<StyledCommentForm onSubmit={handleSubmit}>
				<textarea
					id={props.post._id + '_add_comment_content'}
					name='content'
					value={formData.content}
					onChange={handleChange}
				></textarea>
				<button disabled={isLoadingMutate}>Add Comment</button>
			</StyledCommentForm>
		</StyledCommentFormContainer>
	);
}

export default CommentForm;
