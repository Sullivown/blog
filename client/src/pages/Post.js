import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import WithLoading from '../wrappers/WithLoading';

import PostDetail from '../components/PostDetail';
import { getPost } from '../api/post';

const PostDetailWithLoading = WithLoading(PostDetail);

const PostContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Post() {
	const { id } = useParams();

	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPost({ postId: id }),
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<PostContainer>
			<h1>Post Detail</h1>
			{isFetching && <div>Updating...</div>}
			<PostDetailWithLoading
				isLoading={isLoading}
				post={data ? data.post : {}}
				showComments={true}
			/>
		</PostContainer>
	);
}

export default Post;
