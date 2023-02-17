import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import UserContext from '../../context/userContext';

const StyledDashboardNavBar = styled.nav``;

const StyledNavContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 15px;
	padding: 10px;
	border-top: 1px dashed ${(props) => props.theme.text};
`;

const StyledNavCenter = styled.div`
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

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	color: ${(props) => props.theme.text};
	&.active {
		color: ${(props) => props.theme.accent};
	}
`;

function DashboardNavbar(props) {
	const user = useContext(UserContext);

	return (
		<StyledDashboardNavBar aria-label='secondary'>
			<StyledNavContainer>
				<StyledNavCenter>
					<StyledUl>
						<StyledLi>
							<StyledNavLink end to='dashboard/posts/create'>
								Create Post
							</StyledNavLink>
						</StyledLi>
						<StyledLi>
							<StyledNavLink end to='dashboard/posts'>
								My Posts
							</StyledNavLink>
						</StyledLi>
						{user?.admin && (
							<>
								<StyledLi>
									<StyledNavLink to='dashboard/admin/posts'>
										Posts Admin
									</StyledNavLink>
								</StyledLi>
								<StyledLi>
									<StyledNavLink to='dashboard/admin/users'>
										Users Admin
									</StyledNavLink>
								</StyledLi>
							</>
						)}
						<StyledLi>
							<StyledNavLink to='dashboard/account'>
								Account Settings
							</StyledNavLink>
						</StyledLi>
					</StyledUl>
				</StyledNavCenter>
			</StyledNavContainer>
		</StyledDashboardNavBar>
	);
}

export default DashboardNavbar;
