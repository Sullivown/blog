import React from 'react';
import styled from 'styled-components';

import UserDetail from './UserDetail';
import UserSummary from './UserSummary';

const StyledUserList = styled.div`
	display: flex;
	flex-direction: column;
`;

function UserList(props) {
	console.log(props);
	const userElements = props.users.map((user) =>
		props.summary ? (
			<UserSummary key={user._id} user={user} />
		) : (
			<UserDetail key={user._id} user={user} />
		)
	);

	return <StyledUserList>{userElements}</StyledUserList>;
}

export default UserList;
