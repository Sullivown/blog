import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/user';
import UserContext from '../context/userContext';

const StyledUserSummaryContainer = styled.div`
	border: 1px solid black;
	margin-top: 5px;
`;

const StyledUserSummary = styled.div`
	display: grid;
	gap: 5px;
	grid-template-columns: 3fr 1fr auto 1fr auto;
	grid-template-rows: 1fr;
	padding: 5px;
	justify-items: center;
	align-items: center;
`;

const StyledControlsDiv = styled.div``;

function UserSummary(props) {
	const currentUser = useContext(UserContext);
	const queryClient = useQueryClient();
	const { mutate, isLoading: isLoadingMutate } = useMutation({
		mutationFn: (event) => {
			event.preventDefault();
			return deleteUser({ userId: props.user._id, currentUser });
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});

	return (
		<StyledUserSummaryContainer>
			<StyledUserSummary>
				<Link to={`/dashboard/admin/users/${props.user._id}`}>
					<h2>{props.user.title}</h2>
				</Link>
				<p>{props.user.first_name + ' ' + props.user.last_name}</p>
				<p>{props.user.admin ? 'Admin' : 'User'}</p>
				<p>{props.user.status}</p>
				{(props.user._id === currentUser.id || currentUser.admin) && (
					<StyledControlsDiv>
						<Link to={`/dashboard/admin/users/${props.user._id}`}>
							<button disabled={isLoadingMutate}>Edit</button>
						</Link>
						<button onClick={mutate} disabled={isLoadingMutate}>
							Delete
						</button>
					</StyledControlsDiv>
				)}
			</StyledUserSummary>
		</StyledUserSummaryContainer>
	);
}

export default UserSummary;
