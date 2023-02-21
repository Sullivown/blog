import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { deleteComment } from '../api/comment';
import UserContext from '../context/userContext';
import CommentForm from './CommentForm';

import Link from '../elements/Link';
import MetaData from '../elements/MetaData';

const StyledCommentContainer = styled.div`
	border-top: 1px dashed ${(props) => props.theme.secondary};
	margin-top: 15px;
	margin-bottom: 15px;
	padding: 15px;
`;

const StyledCommentHeader = styled.div`
	font-weight: 500;
`;

const StyledCommentDetail = styled.div``;

const StyledCommentFooter = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const StyledControlsButton = styled.button`
	background-color: ${(props) => props.theme.bg};
	color: ${(props) => props.theme.text};
	border: none;
	padding: 0;
	font-size: 0.8rem;

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

function CommentDetail(props) {
	const currentUser = useContext(UserContext);
	const queryClient = useQueryClient();
	const [isBeingEdited, setIsBeingEdited] = useState(false);
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
			setIsBeingEdited((prevState) => !prevState);
		} else if (event.target.value === 'delete') {
			mutate({
				postId: props.comment.post,
				commentId: props.comment._id,
				currentUser,
			});
		}
	};

	return (
		<StyledCommentContainer>
			{isBeingEdited ? (
				<CommentForm
					post={{ _id: props.comment.post }}
					comment={props.comment}
					isBeingEdited={isBeingEdited}
					setIsBeingEdited={setIsBeingEdited}
				/>
			) : (
				<StyledCommentDetail>
					<StyledCommentHeader>
						<Link to={`/users/${props.comment.user._id}`}>
							{props.comment.user.first_name +
								' ' +
								props.comment.user.last_name}{' '}
						</Link>
						said:
					</StyledCommentHeader>
					<p>{props.comment.content}</p>
					<StyledCommentFooter>
						<MetaData>@ {props.comment.creation_date}</MetaData>
						{(props.comment.user._id === currentUser?.id ||
							currentUser?.admin) && (
							<>
								<StyledControlsButton
									value='edit'
									type='button'
									onClick={handleControlsClick}
									disabled={isLoadingMutate}
								>
									edit
								</StyledControlsButton>
								<StyledControlsButton
									value='delete'
									type='button'
									onClick={handleControlsClick}
									disabled={isLoadingMutate}
								>
									delete
								</StyledControlsButton>
							</>
						)}
					</StyledCommentFooter>
				</StyledCommentDetail>
			)}
		</StyledCommentContainer>
	);
}

export default CommentDetail;
