import React, { useContext } from 'react';
import styled from 'styled-components';

import Link from '../elements/Link';

import CommentList from './CommentList';
import CommentForm from './CommentForm';
import UserContext from '../context/userContext';

import MetaData from '../elements/MetaData';

const StyledPostDetailContainer = styled.div`
	width: clamp(250px, 1000px, 90vw);
	border: 1px solid ${(props) => props.theme.secondary};
	margin-top: 15px;
	padding: 15px;
`;

const StyledPostDetail = styled.div`
	margin-bottom: 15px;
`;

const StyledPostHeader = styled.div``;

const StyledPostContent = styled.div``;

const StyledPostCommentsContainer = styled.div``;

function PostDetail(props) {
	const currentUser = useContext(UserContext);
	return (
		<StyledPostDetailContainer>
			<StyledPostDetail>
				<StyledPostHeader>
					<Link to={`/posts/${props.post._id}`}>
						<h2>{props.post.title}</h2>
					</Link>
					<MetaData>
						by{' '}
						<Link to={`/users/${props.post.user._id}`}>
							{props.post.user.first_name +
								' ' +
								props.post.user.last_name}
						</Link>
					</MetaData>
				</StyledPostHeader>
				<StyledPostContent>
					<p>{props.post.content}</p>
				</StyledPostContent>
				<MetaData>{props.post.creation_date}</MetaData>
			</StyledPostDetail>
			<StyledPostCommentsContainer>
				{props.showComments && (
					<CommentList comments={props.post.comments} />
				)}
				{props.showComments && currentUser && (
					<CommentForm post={props.post} />
				)}
			</StyledPostCommentsContainer>
		</StyledPostDetailContainer>
	);
}

export default PostDetail;
