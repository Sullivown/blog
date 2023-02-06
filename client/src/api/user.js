export async function getUsers() {
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
}

export async function getUser(userId) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
	);
	if (!response.ok) {
		throw new Error(`Network response was not ok: ${response.status}`);
	}
	return response.json();
}

export async function deleteUser(userId, user) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/user/${userId}`,
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		}
	);
	if (!response.ok) {
		throw new Error(`Post delete unsuccessful`);
	}
	return response.json();
}
