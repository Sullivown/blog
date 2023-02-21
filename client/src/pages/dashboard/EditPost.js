import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import WithLoading from '../../wrappers/WithLoading';
import PostForm from '../../components/PostForm';
import { getPost } from '../../api/post';

const EditPostContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: clamp(250px, 1000px, 90vw);
`;

const PostFormWithLoading = WithLoading(PostForm);

function EditPost() {
	const { id } = useParams();

	const { isLoading, error, data } = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPost({ postId: id }),
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<EditPostContainer>
			<h1>Edit Post</h1>
			<PostFormWithLoading isLoading={isLoading} post={data?.post} />
		</EditPostContainer>
	);
}

export default EditPost;
