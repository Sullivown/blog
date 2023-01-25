import React from 'react';
import styled from 'styled-components';

import CommentDetail from './CommentDetail';

const StyledCommentList = styled.div``;

function PostDetail(props) {
	const commentElements = props.comments.map((comment) => (
		<CommentDetail key={comment._id} comment={comment} />
	));

	return (
		<StyledCommentList>
			<div>{commentElements}</div>
		</StyledCommentList>
	);
}

export default PostDetail;
