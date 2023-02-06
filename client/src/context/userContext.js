import { createContext } from 'react';

const UserContext = createContext({
	first_name: null,
	last_name: null,
	admin: false,
	token: null,
});

export default UserContext;
