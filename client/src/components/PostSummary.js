import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledPostSummaryContainer = styled.div`
	border: 1px solid black;
	margin-top: 5px;
`;

const StyledPostSummary = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
`;

function PostSummary(props) {
	return (
		<StyledPostSummaryContainer>
			<StyledPostSummary>
				<Link
					to={`/dashboard/posts/${props.post._id}`}
					state={{ post: props.post }}
				>
					<h2>{props.post.title}</h2>
				</Link>
				<p>
					{props.post.user.first_name +
						' ' +
						props.post.user.last_name}
				</p>
				<p>{props.post.creation_date}</p>
				<p>{props.post.status}</p>
				<Link
					to={`/dashboard/posts/${props.post._id}`}
					state={{ post: props.post }}
				>
					<button>Edit</button>
				</Link>
				<button>Delete</button>
			</StyledPostSummary>
		</StyledPostSummaryContainer>
	);
}

export default PostSummary;
