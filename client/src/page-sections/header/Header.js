import React from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';

const StyledHeader = styled.header`
	background-color: antiquewhite;
`;

function Header() {
	return (
		<StyledHeader>
			<Navbar />
		</StyledHeader>
	);
}

export default Header;
