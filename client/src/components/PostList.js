import React from 'react';
import styled from 'styled-components';

import PostDetail from './PostDetail';
import PostSummary from './PostSummary';

const StyledPostList = styled.div`
	display: flex;
	flex-direction: column;
`;

function PostList(props) {
	const postElements = props.posts.map((post) =>
		props.summary ? (
			<PostSummary key={post._id} post={post} />
		) : (
			<PostDetail
				key={post._id}
				post={post}
				showComments={props.showComments}
			/>
		)
	);

	return <StyledPostList>{postElements}</StyledPostList>;
}

export default PostList;
