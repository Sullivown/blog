import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import WithLoading from '../../wrappers/WithLoading';
import PostForm from '../../components/PostForm';

const CreatePostContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PostFormWithLoading = WithLoading(PostForm);

function CreatePost() {
	const { id } = useParams();

	const { isLoading, error, data } = useQuery({
		queryKey: ['posts', parseInt(id)],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		},
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<CreatePostContainer>
			<h1>Edit Post</h1>
			<PostFormWithLoading isLoading={isLoading} post={data?.post} />
		</CreatePostContainer>
	);
}

export default CreatePost;
