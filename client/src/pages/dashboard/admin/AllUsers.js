import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import UserList from '../../../components/UserList';
import WithLoading from '../../../wrappers/WithLoading';
import { getUsers } from '../../../api/user';
import { Link } from 'react-router-dom';

const StyledControlsContainer = styled.div``;

const AllUsersContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UserListWithLoading = WithLoading(UserList);

function AllUsers() {
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['users'],
		queryFn: () => getUsers(),
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<>
			<StyledControlsContainer>
				<Link to='create'>
					<button type='button'>Create New User</button>
				</Link>
			</StyledControlsContainer>
			<AllUsersContainer>
				<h1>All Users</h1>
				{isFetching && <div>Updating...</div>}
				<UserListWithLoading
					isLoading={isLoading}
					users={data ? data.user_list : []}
					summary={true}
				/>
			</AllUsersContainer>
		</>
	);
}

export default AllUsers;
