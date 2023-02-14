import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Navbar';
import DashboardNavbar from './DashboardNavbar';

const StyledHeader = styled.header`
	background-color: antiquewhite;
	border-bottom: 1px solid black;
`;

function Header(props) {
	const location = useLocation();
	const isDashboardRoute = location.pathname.includes('dashboard');

	return (
		<StyledHeader>
			<Navbar setUser={props.setUser} />
			{isDashboardRoute && <DashboardNavbar />}
		</StyledHeader>
	);
}

export default Header;
