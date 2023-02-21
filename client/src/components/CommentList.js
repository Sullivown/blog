import React from 'react';
import styled from 'styled-components';

import CommentDetail from './CommentDetail';

const StyledCommentList = styled.div`
	border-bottom: 1px dashed ${(props) => props.theme.secondary};
	margin-bottom: 15px;
`;

function CommentList(props) {
	const commentElements = props.comments.map((comment) => (
		<CommentDetail key={comment._id} comment={comment} />
	));

	return (
		<StyledCommentList>
			<div>{commentElements}</div>
		</StyledCommentList>
	);
}

export default CommentList;
