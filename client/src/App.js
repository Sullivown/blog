import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Posts from './pages/Posts';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/posts'>
					<Route index element={<Posts />} />
					<Route path=':id' element={<Post />} />
				</Route>
				<Route path='/dashboard' element={<Home />}>
					<Route path='posts' element={<Home />}>
						<Route path='create' element={<Home />} />
						<Route path=':id' element={<Home />} />
					</Route>
					<Route path='admin' element={<Home />}>
						<Route path='users' element={<Home />} />
						<Route path='posts' element={<Home />} />
					</Route>
				</Route>
				<Route path='/*' element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
