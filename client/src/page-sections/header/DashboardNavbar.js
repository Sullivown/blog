import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';

const StyledDashboardNavBar = styled.nav``;

const StyledNavContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 15px;
	padding: 10px;
	border-top: 1px dashed black;
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

function DashboardNavbar(props) {
	const user = useContext(UserContext);

	return (
		<StyledDashboardNavBar aria-label='secondary'>
			<StyledNavContainer>
				<StyledNavRight>
					<StyledUl>
						<StyledLi>
							<StyledLink to='dashboard/posts'>
								My Posts
							</StyledLink>
						</StyledLi>
						{user.admin && (
							<>
								<StyledLi>
									<StyledLink to='admin/posts'>
										Posts Admin
									</StyledLink>
								</StyledLi>
								<StyledLi>
									<StyledLink to='admin/users'>
										Users Admin
									</StyledLink>
								</StyledLi>
							</>
						)}
						<StyledLi>
							<StyledLink to='dashboard/account'>
								Account Settings
							</StyledLink>
						</StyledLi>
					</StyledUl>
				</StyledNavRight>
			</StyledNavContainer>
		</StyledDashboardNavBar>
	);
}

export default DashboardNavbar;
