import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Link from '../../elements/Link';
import NavLink from '../../elements/NavLink';

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
	font-size: 2rem;
	font-weight: 800;
`;

const StyledNavRight = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;
	font-size: 1.2rem;
	font-weight: 800;
`;

const StyledUl = styled.ul`
	display: flex;
	gap: 15px;
	list-style-type: none;
`;

const StyledLi = styled.li``;

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
					<Link to='/'>Community Blog</Link>
				</StyledSiteTitle>
				<StyledNavRight>
					<StyledUl>
						<StyledLi>
							<NavLink to='/about'>About</NavLink>
						</StyledLi>
						<StyledLi>
							<NavLink to='posts'>Posts</NavLink>
						</StyledLi>
						<StyledLi>
							<NavLink to='users'>Users</NavLink>
						</StyledLi>
						{user && (
							<StyledLi>
								<NavLink to='dashboard'>Dashboard</NavLink>
							</StyledLi>
						)}
						<StyledLi>
							{user ? (
								<Link onClick={handleLogoutClick}>Log Out</Link>
							) : (
								<NavLink to='login'>Login / Signup</NavLink>
							)}
						</StyledLi>
					</StyledUl>
					<div>
						<button onClick={props.handleToggleTheme}>
							Toggle Theme
						</button>
					</div>
				</StyledNavRight>
			</StyledNavContainer>
		</StyledNavBar>
	);
}

export default Navbar;
