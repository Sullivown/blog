import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Post() {
	return (
		<PostContainer>
			<h1>Post Detail</h1>
		</PostContainer>
	);
}

export default Post;
