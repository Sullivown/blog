import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CommentList from './CommentList';
import CommentForm from './CommentForm';
import UserContext from '../context/userContext';

const StyledPostDetailContainer = styled.div`
	min-width: 500px;
	border: 1px solid ${(props) => props.theme.secondary};
	margin-top: 15px;
`;

const StyledPostDetail = styled.div`
	padding: 15px;
`;

function PostDetail(props) {
	const currentUser = useContext(UserContext);
	return (
		<StyledPostDetailContainer>
			<StyledPostDetail>
				<Link to={`/posts/${props.post._id}`}>
					<h2>{props.post.title}</h2>
				</Link>
				<p>{props.post.content}</p>
				<Link to={`/users/${props.post.user._id}`}>
					<p>
						{' '}
						{props.post.user.first_name +
							' ' +
							props.post.user.last_name}
					</p>
				</Link>

				<p>{props.post.creation_date}</p>
			</StyledPostDetail>
			{props.showComments && (
				<CommentList comments={props.post.comments} />
			)}
			{props.showComments && currentUser && (
				<CommentForm post={props.post} />
			)}
		</StyledPostDetailContainer>
	);
}

export default PostDetail;
