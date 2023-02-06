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

export async function postUser(formData) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/users`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		}
	);
	if (!response.ok) {
		throw new Error(`User creation unsuccessful`);
	}
	return response.json();
}

export async function putUser(userId, formData, user) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
		{
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify(formData),
		}
	);
	if (!response.ok) {
		throw new Error(`User edit unsuccessful`);
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
