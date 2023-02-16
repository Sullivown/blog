import axios from 'axios';

export async function postComment({ postId, formData, user }) {
	const res = await axios.post(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/comments`,
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

export async function putComment({ postId, commentId, formData, user }) {
	const res = await axios.put(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/comments/${commentId}`,
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

export async function deleteComment({ postId, commentId, user }) {
	const res = await axios.delete(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/comments/${commentId}`,
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
