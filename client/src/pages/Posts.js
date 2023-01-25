import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PostList from '../components/PostList';

const PostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Posts() {
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
		<PostsContainer>
			<h1>Posts</h1>
			<PostList posts={posts} commentsEnabled={true} />
		</PostsContainer>
	);
}

export default Posts;
