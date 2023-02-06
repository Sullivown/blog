export async function postLogin(formData) {
	const response = await fetch(
		`${process.env.REACT_APP_API_BASE_URL}/auth/login`,
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
		throw new Error('Login unsuccessful');
	}
	return response.json();
}
