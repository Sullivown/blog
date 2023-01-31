import React from 'react';
import styled from 'styled-components';

import CreatePostForm from '../../components/CreatePostForm';

const CreatePostContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function CreatePost() {
	return (
		<CreatePostContainer>
			<h1>Create Post</h1>
			<CreatePostForm />
		</CreatePostContainer>
	);
}

export default CreatePost;
