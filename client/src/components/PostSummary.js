import React, { useContext } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/post';
import UserContext from '../context/userContext';

import Link from '../elements/Link';

const StyledPostSummaryContainer = styled.div`
	border: 1px solid black;
	margin-top: 5px;
	width: clamp(250px, 1000px, 90vw);
	border: 1px solid ${(props) => props.theme.secondary};
	padding: 15px;
`;

const StyledPostSummary = styled.div`
	display: grid;
	gap: 5px;
	grid-template-columns: 3fr 1fr auto 1fr auto;
	grid-template-rows: 1fr;
	padding: 5px;
	justify-items: center;
	align-items: center;
`;

const StyledPostSummaryTitle = styled.div`
	justify-self: start;
`;

const StyledControlsDiv = styled.div``;

function PostSummary(props) {
	const currentUser = useContext(UserContext);
	const queryClient = useQueryClient();
	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: (postId) => {
			return deletePost({ postId, currentUser });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['users', currentUser.id],
			});
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	const handleClick = (event) => {
		event.preventDefault();
		mutate(props.post._id);
	};

	return (
		<StyledPostSummaryContainer>
			<StyledPostSummary>
				<StyledPostSummaryTitle>
					<Link to={`/dashboard/posts/${props.post._id}`}>
						<h2>{props.post.title}</h2>
					</Link>
				</StyledPostSummaryTitle>

				<p>
					{props.post.user.first_name +
						' ' +
						props.post.user.last_name}
				</p>
				<p>{props.post.creation_date}</p>
				<p>{props.post.status}</p>
				{(props.post.user._id === currentUser.id ||
					currentUser.admin) && (
					<StyledControlsDiv>
						<Link to={`/dashboard/posts/${props.post._id}`}>
							<button disabled={isLoadingMutate}>Edit</button>
						</Link>
						<button
							onClick={handleClick}
							disabled={isLoadingMutate}
						>
							Delete
						</button>
					</StyledControlsDiv>
				)}
			</StyledPostSummary>
		</StyledPostSummaryContainer>
	);
}

export default PostSummary;
