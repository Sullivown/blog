import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PostList from '../components/PostList';

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
			.then((result) => result.json())
			.then((data) => {
				setPosts(data.post_list);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<HomeContainer>
			<h1>Home</h1>
			<PostList posts={posts} />
		</HomeContainer>
	);
}

export default Home;
