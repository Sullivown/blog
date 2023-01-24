import React from 'react';
import styled from 'styled-components';

import Comment from './Comment';

const StyledPost = styled.div``;

function Post(props) {
	const commentElements = props.post.comments.map((comment) => (
		<Comment key={comment._id} comment={comment} />
	));

	return (
		<StyledPost>
			<h2>{props.post.title}</h2>
			<p>{props.post.content}</p>
			<p>
				{props.post.user.first_name + ' ' + props.post.user.last_name}
			</p>
			<p>{props.post.creation_date}</p>
			<div>{commentElements}</div>
		</StyledPost>
	);
}

export default Post;
