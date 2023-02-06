import React from 'react';
import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import UserList from '../components/UserList';
import WithLoading from '../wrappers/WithLoading';
import { getUsers } from '../api/user';

const UsersContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UserListWithLoading = WithLoading(UserList);

function Users() {
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<UsersContainer>
			<h1>Users</h1>
			{isFetching && <div>Updating...</div>}
			<UserListWithLoading
				isLoading={isLoading}
				users={data ? data.user_list : []}
				showComments={true}
			/>
		</UsersContainer>
	);
}

export default Users;
