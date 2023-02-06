import React from 'react';
import { Routes, Route } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './context/userContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Posts from './pages/Posts';
import Dashboard from './pages/dashboard/Dashboard';
import MyPosts from './pages/dashboard/MyPosts';
import CreatePost from './pages/dashboard/CreatePost';
import EditPost from './pages/dashboard/EditPost';
import User from './pages/User';
import Header from './page-sections/header/Header';

function App() {
	const [user, setUser] = useLocalStorage('user', null);

	return (
		<>
			<UserContext.Provider value={user}>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={<Login setUser={setUser} />}
					/>
					<Route path='/posts'>
						<Route index element={<Posts />} />
						<Route path=':id' element={<Post />} />
					</Route>
					<Route path='/users'>
						<Route index element={<Home />} />
						<Route path=':id' element={<User />} />
					</Route>
					<Route path='/dashboard' element={<Dashboard />}>
						<Route path='posts'>
							<Route index element={<MyPosts />} />
							<Route path='create' element={<CreatePost />} />
							<Route path=':id' element={<EditPost />} />
						</Route>
						<Route path='admin' element={<Home />}>
							<Route path='users' element={<Home />} />
							<Route path='posts' element={<Home />} />
						</Route>
					</Route>
					<Route path='/*' element={<Home />} />
				</Routes>
			</UserContext.Provider>
		</>
	);
}

export default App;
