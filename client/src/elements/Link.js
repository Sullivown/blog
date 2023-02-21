import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
	color: ${(props) => props.theme.text};
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

export default StyledLink;
