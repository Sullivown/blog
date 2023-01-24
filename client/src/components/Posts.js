import React from 'react';
import styled from 'styled-components';

import Post from './Post';

const StyledPostsContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

function Posts(props) {
	const postElements = props.posts.map((post) => (
		<Post key={post._id} post={post} />
	));

	return <StyledPostsContainer>{postElements}</StyledPostsContainer>;
}

export default Posts;
