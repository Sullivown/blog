import React from 'react';
import styled from 'styled-components';

const StyledCommentForm = styled.form``;

function CommentForm(props) {
	return (
		<StyledCommentForm>
			<label>Add Comment</label>
			<textarea></textarea>
		</StyledCommentForm>
	);
}

export default CommentForm;
