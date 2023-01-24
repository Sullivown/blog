import React from 'react';
import styled from 'styled-components';

const StyledComment = styled.div``;

function Post(props) {
	console.log(props.comment);
	return (
		<StyledComment>
			<p>{props.comment.content}</p>
			<p>
				{props.comment.user.first_name +
					' ' +
					props.comment.user.last_name}
			</p>
			<p>{props.comment.creation_date}</p>
		</StyledComment>
	);
}

export default Post;
