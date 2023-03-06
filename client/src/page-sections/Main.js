import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import Home from '../pages/Home';
import About from '../pages/About';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Post from '../pages/Post';
import Posts from '../pages/Posts';
import User from '../pages/User';
import Users from '../pages/Users';
import Dashboard from '../pages/dashboard/Dashboard';
import MyPosts from '../pages/dashboard/MyPosts';
import CreatePost from '../pages/dashboard/CreatePost';
import EditPost from '../pages/dashboard/EditPost';
import AllPosts from '../pages/dashboard/admin/AllPosts';

import Admin from '../pages/dashboard/admin/Admin';
import Account from '../pages/dashboard/Account';
import AllUsers from '../pages/dashboard/admin/AllUsers';
import NotFound from '../pages/NotFound';
import CreateUser from '../pages/dashboard/admin/CreateUser';
import EditUser from '../pages/dashboard/admin/EditUser';
import DashboardHome from '../pages/dashboard/DashboardHome';

const StyledMain = styled.main`
	background-color: ${(props) => props.theme.bg};
	color: ${(props) => props.theme.text};
	margin-bottom: 15px;
`;

function Main(props) {
	return (
		<StyledMain>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route
					path='/login'
					element={
						props.user ? (
							<Navigate to='/dashboard' />
						) : (
							<Login setUser={props.setUser} />
						)
					}
				/>
				<Route
					path='/signup'
					element={
						props.user ? <Navigate to='/dashboard' /> : <SignUp />
					}
				/>
				<Route path='/posts'>
					<Route index element={<Posts />} />
					<Route path=':id' element={<Post />} />
				</Route>
				<Route path='/users'>
					<Route index element={<Users />} />
					<Route path=':id' element={<User />} />
				</Route>
				<Route
					path='/dashboard'
					element={
						props.user ? <Dashboard /> : <Navigate to='/login' />
					}
				>
					<Route index element={<DashboardHome />} />
					<Route path='posts'>
						<Route index element={<MyPosts />} />
						<Route path='create' element={<CreatePost />} />
						<Route path=':id' element={<EditPost />} />
					</Route>
					<Route
						path='account'
						element={<Account setUser={props.setUser} />}
					/>
					<Route path='admin'>
						<Route
							index
							element={
								props.user ? (
									<Admin />
								) : (
									<Navigate to='/login' />
								)
							}
						/>
						<Route path='users'>
							<Route index element={<AllUsers />} />
							<Route path='create' element={<CreateUser />} />
							<Route path=':id' element={<EditUser />} />
						</Route>
						<Route path='posts' element={<AllPosts />} />
					</Route>
				</Route>
				<Route path='/*' element={<NotFound />} />
			</Routes>
		</StyledMain>
	);
}

export default Main;
