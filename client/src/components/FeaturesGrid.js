import React from 'react';
import styled from 'styled-components';

import bigIdea from '../assets/img/big-idea.png';
import talking from '../assets/img/talking.png';
import hug from '../assets/img/hug.png';

const StyledFeaturesGridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 50px;
	margin-top: 15px;
	width: 80%;
`;

const StyledImage = styled.img`
	width: 150px;
	background-color: white;
	border-radius: 20%;
	padding: 25px;
`;

const StyledSingleFeature = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	text-align: center;
`;

function FeaturesGrid() {
	return (
		<StyledFeaturesGridContainer>
			<StyledSingleFeature>
				<StyledImage src={bigIdea} alt='Blog' />
				<h4>Blog</h4>
				<p>Share with others</p>
			</StyledSingleFeature>
			<StyledSingleFeature>
				<StyledImage src={talking} alt='Discuss' />
				<h4>Discuss</h4>
				<p>Engage with and discuss ideas</p>
			</StyledSingleFeature>
			<StyledSingleFeature>
				<StyledImage src={hug} alt='Moderate' />
				<h4>Moderate</h4>
				<p>Cultivate a positive community</p>
			</StyledSingleFeature>
		</StyledFeaturesGridContainer>
	);
}

export default FeaturesGrid;
