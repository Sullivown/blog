import React from 'react';
import styled from 'styled-components';

import Post from './PostDetail';

const StyledPostList = styled.div`
	display: flex;
	flex-direction: column;
`;

function PostList(props) {
	const postElements = props.posts.map((post) => (
		<Post key={post._id} post={post} showComments={props.showComments} />
	));

	return <StyledPostList>{postElements}</StyledPostList>;
}

export default PostList;
