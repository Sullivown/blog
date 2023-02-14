import React from 'react';

import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './context/userContext';
import GlobalStyle from './style/GlobalStyle';

import Header from './page-sections/header/Header';
import Main from './page-sections/Main';

function App() {
	const [user, setUser] = useLocalStorage('user', null);

	return (
		<>
			<UserContext.Provider value={user}>
				<GlobalStyle />
				<Header setUser={setUser} />
				<Main user={user} setUser={setUser} />
			</UserContext.Provider>
		</>
	);
}

export default App;
