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
