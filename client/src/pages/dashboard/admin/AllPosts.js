import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import PostList from '../../../components/PostList';
import WithLoading from '../../../wrappers/WithLoading';
import { getPosts } from '../../../api/post';

const AllPostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PostListWithLoading = WithLoading(PostList);

function AllPosts() {
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['posts'],
		queryFn: () => getPosts(),
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<AllPostsContainer>
			<h1>All Posts</h1>
			{isFetching && <div>Updating...</div>}
			<PostListWithLoading
				isLoading={isLoading}
				posts={data ? data.post_list : []}
				summary={true}
				showComments={false}
			/>
		</AllPostsContainer>
	);
}

export default AllPosts;
