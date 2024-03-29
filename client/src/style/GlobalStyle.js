import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
${normalize}

* {
	box-sizing: border-box;
}
body{
	box-sizing: border-box;
	margin: 0px;
	background-color: ${(props) => props.theme.bg};
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
} 
`;

export default GlobalStyle;
