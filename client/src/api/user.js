export async function getUser(userId) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
	);
	if (!response.ok) {
		throw new Error(`Network response was not ok: ${response.status}`);
	}
	return response.json();
}
