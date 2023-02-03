export async function getPosts() {
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
}

export async function getPost(postId) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`
	);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
}

export async function postPost(formData, user) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/posts`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify(formData),
		}
	);
	if (!response.ok) {
		throw new Error(`Post creation unsuccessful`);
	}
	return response.json();
}

export async function putPost(postId, formData, user) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`,
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
		throw new Error(`Post edit unsuccessful`);
	}
	return response.json();
}
