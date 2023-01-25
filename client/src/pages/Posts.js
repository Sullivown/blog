import React from 'react';
import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';

import PostList from '../components/PostList';
import WithLoading from '../wrappers/WithLoading';

const PostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PostListWithLoading = WithLoading(PostList);

function Posts() {
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/posts`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		},
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<PostsContainer>
			<h1>Posts</h1>
			{isFetching && <div>Updating...</div>}
			<PostListWithLoading
				isLoading={isLoading}
				posts={data ? data.post_list : []}
				showComments={true}
			/>
		</PostsContainer>
	);
}

export default Posts;
