import React from 'react';
import styled from 'styled-components';

import Link from '../elements/Link';

const StyledUserDetailContainer = styled.div`
	width: clamp(250px, 1000px, 90vw);
	border: 1px solid ${(props) => props.theme.secondary};
	margin-top: 15px;
`;

const StyledUserDetail = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px;
`;

function UserDetail(props) {
	return (
		<StyledUserDetailContainer>
			<StyledUserDetail>
				<Link to={`/users/${props.user._id}`}>
					<h1>
						{props.user.first_name} {props.user.last_name}
					</h1>
				</Link>
				<p>{props.user.admin ? 'Admin' : 'Member'}</p>
				<p>Member since: {props.user.creation_date}</p>
			</StyledUserDetail>
		</StyledUserDetailContainer>
	);
}

export default UserDetail;
