import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledUserDetailContainer = styled.div`
	border: 1px solid black;
	margin-top: 15px;
`;

const StyledUserDetail = styled.div`
	padding: 15px;
`;

function UserDetail(props) {
	console.log(props);
	return (
		<StyledUserDetailContainer>
			<StyledUserDetail>
				<Link to={`/users/${props.user._id}`}>
					<h1>
						{props.user.first_name} {props.user.last_name}
					</h1>
				</Link>
				<p>Member since: {props.user.creation_date}</p>
				<p>{props.user.admin ? 'Admin' : 'Member'}</p>
			</StyledUserDetail>
		</StyledUserDetailContainer>
	);
}

export default UserDetail;