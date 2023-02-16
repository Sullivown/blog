import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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

const sharedLinkStyle = css`
	text-decoration: none;
`;

const StyledNavLink = styled(NavLink)`
	${sharedLinkStyle}
	&.active {
		color: red;
	}
`;

const StyledLink = styled(Link)`
	${sharedLinkStyle}
`;

function Navbar(props) {
	const user = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogoutClick = () => {
		props.setUser(null);
		navigate('/');
	};

	return (
		<StyledNavBar aria-label='primary'>
			<StyledNavContainer>
				<StyledSiteTitle>
					<StyledNavLink to='/'>Community Blog</StyledNavLink>
				</StyledSiteTitle>
				<StyledNavRight>
					<StyledUl>
						<StyledLi>
							<StyledNavLink to='/about'>About</StyledNavLink>
						</StyledLi>
						<StyledLi>
							<StyledNavLink to='posts'>Posts</StyledNavLink>
						</StyledLi>
						<StyledLi>
							<StyledNavLink to='users'>Users</StyledNavLink>
						</StyledLi>
						{user && (
							<StyledLi>
								<StyledNavLink to='dashboard'>
									Dashboard
								</StyledNavLink>
							</StyledLi>
						)}
						{user?.admin && (
							<StyledLi>
								<StyledNavLink to='dashboard/admin'>
									Admin Panel
								</StyledNavLink>
							</StyledLi>
						)}
						<StyledLi>
							{user ? (
								<StyledLink onClick={handleLogoutClick}>
									Log Out
								</StyledLink>
							) : (
								<StyledNavLink to='login'>
									Login / Signup
								</StyledNavLink>
							)}
						</StyledLi>
					</StyledUl>
				</StyledNavRight>
			</StyledNavContainer>
		</StyledNavBar>
	);
}

export default Navbar;
