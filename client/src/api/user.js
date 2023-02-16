import axios from 'axios';

export async function getUsers() {
	const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);

	return res.data;
}

export async function getUser({ userId }) {
	const res = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
	);
	return res.data;
}

export async function postUser({ formData }) {
	const res = await axios.post(
		`${process.env.REACT_APP_API_BASE_URL}/users`,
		formData,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	);

	return res.data;
}

export async function putUser({ userId, formData, currentUser }) {
	const res = await axios.put(
		`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
		formData,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${currentUser.token}`,
			},
		}
	);

	return res.data;
}

export async function deleteUser({ userId, currentUser }) {
	const res = await axios.delete(
		`${process.env.REACT_APP_API_BASE_URL}/user/${userId}`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${currentUser.token}`,
			},
		}
	);

	return res.data;
}
