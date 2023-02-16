import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../../../api/user';
import UserForm from '../../../components/UserForm';
import WithLoading from '../../../wrappers/WithLoading';

const EditUserContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UserFormWithLoading = WithLoading(UserForm);

function EditUser() {
	const { id } = useParams();
	const formSettings = { isEdit: true, isOwn: false };

	const { isLoading, error, data } = useQuery({
		queryKey: ['users', id],
		queryFn: () => getUser({ userId: id }),
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<EditUserContainer>
			<h1>Edit User</h1>
			<UserFormWithLoading
				isLoading={isLoading}
				settings={formSettings}
				user={data?.user}
			/>
		</EditUserContainer>
	);
}

export default EditUser;
