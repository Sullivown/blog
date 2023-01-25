import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CommentList from './CommentList';

const StyledPostDetail = styled.div``;

function PostDetail(props) {
	return (
		<StyledPostDetail>
			<Link to={`/posts/${props.post._id}`}>
				<h2>{props.post.title}</h2>
			</Link>
			<p>{props.post.content}</p>
			<p>
				{props.post.user.first_name + ' ' + props.post.user.last_name}
			</p>
			<p>{props.post.creation_date}</p>
			{props.showComments && (
				<CommentList comments={props.post.comments} />
			)}
		</StyledPostDetail>
	);
}

export default PostDetail;
