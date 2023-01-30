import React from 'react';
import styled from 'styled-components';

const StyledCommentDetail = styled.div`
	border-top: 1px dashed grey;
	padding: 15px;
`;

function CommentDetail(props) {
	return (
		<StyledCommentDetail>
			<p>{props.comment.content}</p>
			<p>
				{props.comment.user.first_name +
					' ' +
					props.comment.user.last_name}
			</p>
			<p>{props.comment.creation_date}</p>
		</StyledCommentDetail>
	);
}

export default CommentDetail;
