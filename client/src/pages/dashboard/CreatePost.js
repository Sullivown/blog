import React from 'react';
import styled from 'styled-components';

import PostForm from '../../components/PostForm';

const CreatePostContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function CreatePost() {
	return (
		<CreatePostContainer>
			<h1>Create Post</h1>
			<PostForm />
		</CreatePostContainer>
	);
}

export default CreatePost;
