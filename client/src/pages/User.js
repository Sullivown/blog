import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import WithLoading from '../wrappers/WithLoading';

import UserDetail from '../components/UserDetail';
import PostList from '../components/PostList';
import { getUser } from '../api/user';

const PostListWithLoading = WithLoading(PostList);

const UserDetailWithLoading = WithLoading(UserDetail);

const UserContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function User() {
	const { id } = useParams();

	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['users', id],
		queryFn: () => getUser(id),
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<UserContainer>
			<h1>User Detail</h1>
			{isFetching && <div>Updating...</div>}
			<UserDetailWithLoading
				isLoading={isLoading}
				user={data ? data.user : {}}
			/>
			<h2>Posts:</h2>
			<PostListWithLoading
				isLoading={isLoading}
				posts={data ? data.user_posts : []}
				summary={false}
				showComments={false}
			/>
		</UserContainer>
	);
}

export default User;
