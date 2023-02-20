import React, { useContext } from 'react';
import styled from 'styled-components';

import Link from '../elements/Link';

import CommentList from './CommentList';
import CommentForm from './CommentForm';
import UserContext from '../context/userContext';

const StyledPostDetailContainer = styled.div`
	width: clamp(250px, 1000px, 90vw);
	border: 1px solid ${(props) => props.theme.secondary};
	margin-top: 15px;
	padding: 15px;
`;

const StyledPostDetail = styled.div``;

const StyledPostHeader = styled.div`
	line-height: 5px;
`;

const StyledPostContent = styled.div``;

const StyledPostCommentsContainer = styled.div``;

const StyledMetaData = styled.small`
	color: ${(props) => props.theme.secondary};
`;

function PostDetail(props) {
	const currentUser = useContext(UserContext);
	return (
		<StyledPostDetailContainer>
			<StyledPostDetail>
				<StyledPostHeader>
					<Link to={`/posts/${props.post._id}`}>
						<h2>{props.post.title}</h2>
					</Link>
					<Link to={`/users/${props.post.user._id}`}>
						<StyledMetaData>
							by{' '}
							{props.post.user.first_name +
								' ' +
								props.post.user.last_name}
						</StyledMetaData>
					</Link>
				</StyledPostHeader>
				<StyledPostContent>
					<p>{props.post.content}</p>
				</StyledPostContent>
				<StyledMetaData>{props.post.creation_date}</StyledMetaData>
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
