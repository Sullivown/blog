import React from 'react';

import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './context/userContext';
import GlobalStyle from './style/GlobalStyle';
import { lightTheme, darkTheme } from './style/Theme';

import Header from './page-sections/header/Header';
import Main from './page-sections/Main';
import { ThemeProvider } from 'styled-components';

function App() {
	const [user, setUser] = useLocalStorage('user', null);
	const [theme, setTheme] = useLocalStorage('theme', 'light');

	const handleToggleTheme = () => {
		setTheme((prevState) => {
			return prevState === 'light' ? 'dark' : 'light';
		});
	};

	return (
		<>
			<UserContext.Provider value={user}>
				<ThemeProvider
					theme={theme === 'light' ? lightTheme : darkTheme}
				>
					<GlobalStyle />
					<Header
						setUser={setUser}
						handleToggleTheme={handleToggleTheme}
					/>
					<Main user={user} setUser={setUser} />
				</ThemeProvider>
			</UserContext.Provider>
		</>
	);
}

export default App;
