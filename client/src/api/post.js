import axios from 'axios';

export async function getPosts() {
	const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/posts`);
	return res.data;
}

export async function getPost({ postId }) {
	const res = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`
	);
	return res.data;
}

export async function postPost({ formData, user }) {
	const res = await axios.post(
		`${process.env.REACT_APP_API_BASE_URL}/posts`,
		formData,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		}
	);
	return res.data;
}

export async function putPost({ postId, formData, user }) {
	const res = await axios.put(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`,
		formData,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		}
	);
	return res.data;
}

export async function deletePost({ postId, user }) {
	const res = await axios.delete(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		}
	);

	return res.data;
}
