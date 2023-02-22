import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function About() {
	return (
		<AboutContainer>
			<h1>About</h1>
			<h2>What is Community Blog?</h2>
			<p>
				Community Blog is (can you guess?) a community
				blogging/journaling app.
			</p>
			<p>
				You can{' '}
				<a href='https://github.com/Sullivown/blog'>
					view the source code on GitHub.
				</a>
			</p>
		</AboutContainer>
	);
}

export default About;
