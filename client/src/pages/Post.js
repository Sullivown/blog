import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PostDetail from '../components/PostDetail';

const PostContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Post() {
	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`)
			.then((result) => result.json())
			.then((data) => {
				setPost(data.post);
			})
			.catch((err) => console.log(err));
	}, [id]);

	return (
		<PostContainer>
			<h1>Post Detail</h1>
			{post ? (
				<PostDetail post={post} commentsEnabled={true} />
			) : (
				'Loading...'
			)}
		</PostContainer>
	);
}

export default Post;
