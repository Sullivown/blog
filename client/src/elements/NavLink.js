import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
	color: ${(props) => props.theme.text};
	text-decoration: none;
	&.active {
		color: ${(props) => props.theme.accent};
	}

	&:hover {
		text-decoration: underline;
	}
`;

export default StyledNavLink;
