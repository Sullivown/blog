import React, { useContext } from 'react';
import styled from 'styled-components';

import NavLink from '../../elements/NavLink';

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

function DashboardNavbar(props) {
	const user = useContext(UserContext);

	return (
		<StyledDashboardNavBar aria-label='secondary'>
			<StyledNavContainer>
				<StyledNavCenter>
					<StyledUl>
						<StyledLi>
							<NavLink end to='dashboard/posts/create'>
								Create Post
							</NavLink>
						</StyledLi>
						<StyledLi>
							<NavLink end to='dashboard/posts'>
								My Posts
							</NavLink>
						</StyledLi>
						{user?.admin && (
							<>
								<StyledLi>
									<NavLink to='dashboard/admin/posts'>
										Posts Admin
									</NavLink>
								</StyledLi>
								<StyledLi>
									<NavLink to='dashboard/admin/users'>
										Users Admin
									</NavLink>
								</StyledLi>
							</>
						)}
						<StyledLi>
							<NavLink to='dashboard/account'>
								Account Settings
							</NavLink>
						</StyledLi>
					</StyledUl>
				</StyledNavCenter>
			</StyledNavContainer>
		</StyledDashboardNavBar>
	);
}

export default DashboardNavbar;
