import React from 'react';
import styled from 'styled-components';

const PostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Home() {
	return (
		<PostsContainer>
			<h1>Posts</h1>
		</PostsContainer>
	);
}

export default Home;
