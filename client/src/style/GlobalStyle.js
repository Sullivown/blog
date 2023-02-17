import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body{
	box-sizing: border-box;
	margin: 0px;
	background-color: ${(props) => props.theme.bg};
	font-family: sans-serif;
} 
`;

export default GlobalStyle;
