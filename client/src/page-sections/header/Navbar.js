import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';

const StyledNavBar = styled.nav``;

const StyledNavContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 15px;
	padding: 25px;
`;

const StyledSiteTitle = styled.div`
	font-size: 1.5rem;
`;

const StyledNavRight = styled.div`
	font-size: 1.2rem;
`;

const StyledUl = styled.ul`
	display: flex;
	gap: 15px;
	list-style-type: none;
`;

const StyledLi = styled.li``;

const StyledLink = styled(Link)`
	text-decoration: none;
`;

function Navbar(props) {
	const user = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogoutClick = () => {
		props.setUser(null);
		navigate('/');
	};

	return (
		<StyledNavBar>
			<StyledNavContainer>
				<StyledSiteTitle>
					<StyledLink>Community Blog</StyledLink>
				</StyledSiteTitle>
				<StyledNavRight>
					<StyledUl>
						<StyledLi>
							<StyledLink to='/'>About</StyledLink>
						</StyledLi>
						<StyledLi>
							<StyledLink to='posts'>Posts</StyledLink>
						</StyledLi>
						<StyledLi>
							<StyledLink to='users'>Users</StyledLink>
						</StyledLi>
						{user && (
							<StyledLi>
								<StyledLink to='dashboard'>
									Dashboard
								</StyledLink>
							</StyledLi>
						)}

						<StyledLi>
							{user ? (
								<StyledLink onClick={handleLogoutClick}>
									Log Out
								</StyledLink>
							) : (
								<StyledLink to='login'>
									Login / Signup
								</StyledLink>
							)}
						</StyledLi>
					</StyledUl>
				</StyledNavRight>
			</StyledNavContainer>
		</StyledNavBar>
	);
}

export default Navbar;
