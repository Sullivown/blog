import React from 'react';
import styled from 'styled-components';

import DashboardNavbar from '../../page-sections/header/DashboardNavbar';

const StyledHeader = styled.header`
	background-color: antiquewhite;
`;

function DashboardHeader(props) {
	return (
		<StyledHeader>
			<DashboardNavbar setUser={props.setUser} />
		</StyledHeader>
	);
}

export default DashboardHeader;
