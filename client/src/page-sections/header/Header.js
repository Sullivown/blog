import React from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';

const StyledHeader = styled.header`
	background-color: antiquewhite;
`;

function Header(props) {
	return (
		<StyledHeader>
			<Navbar setUser={props.setUser} />
		</StyledHeader>
	);
}

export default Header;
