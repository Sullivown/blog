import React, { useContext } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import PostList from '../../components/PostList';
import WithLoading from '../../wrappers/WithLoading';
import UserContext from '../../context/userContext';

const PostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PostListWithLoading = WithLoading(PostList);

function Posts() {
	const user = useContext(UserContext);

	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['user', parseInt(user.id)],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`
			);
			if (!response.ok) {
				throw new Error(
					`Network response was not ok: ${response.status}`
				);
			}
			return response.json();
		},
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<PostsContainer>
			<h1>My Posts</h1>
			{isFetching && <div>Updating...</div>}
			<PostListWithLoading
				isLoading={isLoading}
				posts={data ? data.user_posts : []}
				summary={true}
				showComments={false}
			/>
		</PostsContainer>
	);
}

export default Posts;
