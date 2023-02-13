import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

const StyledPostDetailContainer = styled.div`
	border: 1px solid black;
	margin-top: 15px;
`;

const StyledPostDetail = styled.div`
	padding: 15px;
`;

function PostDetail(props) {
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
			{props.showComments && <CommentForm post={props.post} />}
		</StyledPostDetailContainer>
	);
}

export default PostDetail;
