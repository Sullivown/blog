import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { getUser } from '../../api/user';
import UserForm from '../../components/UserForm';
import UserContext from '../../context/userContext';
import WithLoading from '../../wrappers/WithLoading';

const AccountContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UserFormWithLoading = WithLoading(UserForm);

function Account(props) {
	const currentUser = useContext(UserContext);
	const formSettings = { isEdit: true, isOwn: true };

	const { isLoading, error, data } = useQuery({
		queryKey: ['users', currentUser.id],
		queryFn: () => getUser({ userId: currentUser.id }),
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<AccountContainer>
			<h1>Account Settings</h1>
			<UserFormWithLoading
				isLoading={isLoading}
				setUser={props.setUser}
				settings={formSettings}
				user={data?.user}
			/>
		</AccountContainer>
	);
}

export default Account;
