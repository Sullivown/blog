import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { deleteComment } from '../api/comment';
import UserContext from '../context/userContext';

const StyledCommentDetail = styled.div`
	border-top: 1px dashed grey;
	padding: 15px;
`;

function CommentDetail(props) {
	const currentUser = useContext(UserContext);
	const queryClient = useQueryClient();
	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: deleteComment,
		onError: (error) => {
			console.log(error);
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	const handleControlsClick = (event) => {
		event.preventDefault();
		if (event.target.value === 'edit') {
		} else if (event.target.value === 'delete') {
			mutate({
				postId: props.comment.post,
				commentId: props.comment._id,
				user: currentUser,
			});
		}
	};

	return (
		<StyledCommentDetail>
			<p>{props.comment.content}</p>
			<p>
				{props.comment.user.first_name +
					' ' +
					props.comment.user.last_name}
			</p>
			<p>{props.comment.creation_date}</p>
			{(props.comment.user._id === currentUser?.id ||
				currentUser?.admin) && (
				<div>
					<button
						value='edit'
						type='button'
						onClick={handleControlsClick}
						disabled={isLoadingMutate}
					>
						Edit
					</button>
					<button
						value='delete'
						type='button'
						onClick={handleControlsClick}
						disabled={isLoadingMutate}
					>
						Delete
					</button>
				</div>
			)}
		</StyledCommentDetail>
	);
}

export default CommentDetail;
