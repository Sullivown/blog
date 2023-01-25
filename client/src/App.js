import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Home />} />
				<Route path='/posts' element={<Home />}>
					<Route path=':id' element={<Home />} />
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
