import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/post';
import UserContext from '../context/userContext';

const StyledPostSummaryContainer = styled.div`
	border: 1px solid black;
	margin-top: 5px;
`;

const StyledPostSummary = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
`;

const StyledControlsDiv = styled.div``;

function PostSummary(props) {
	const user = useContext(UserContext);
	const queryClient = useQueryClient();
	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: (postId) => {
			return deletePost(postId, user);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users', user.id] });
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
				<Link to={`/dashboard/posts/${props.post._id}`}>
					<h2>{props.post.title}</h2>
				</Link>
				<p>
					{props.post.user.first_name +
						' ' +
						props.post.user.last_name}
				</p>
				<p>{props.post.creation_date}</p>
				<p>{props.post.status}</p>
				{(props.post.user._id === user.id || user.admin) && (
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
