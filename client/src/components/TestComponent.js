import React, { useState, useEffect } from 'react';

export default function TestComponent() {
	const [apiData, setApiData] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
			.then((response) => response.json())
			.then((data) => {
				setApiData(data);
			});
	}, []);

	return (
		<div>
			<p>This is a test component</p>
			<div>{apiData ? apiData.message : 'Loading'}</div>
		</div>
	);
}
