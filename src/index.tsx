import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import URLParse from 'url-parse';
import ReactGA from 'react-ga';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/SquadaOne-Monospace.otf';
import { ThemesConfig } from './themes/themes';

import './index.css';

const DEFAULT_THEME = 'light';

ReactGA.initialize('UA-42750664-2', {
  debug: window.location.hostname.indexOf('localhost') >= 0,
});
ReactGA.pageview(window.location.pathname + window.location.search);

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: ${(props) => ThemesConfig[props.theme.main].webBackground}
  }
`;

const parsedUrl = URLParse(window.location.href, true);

if (parsedUrl.query.theme) {
  localStorage.setItem('theme', parsedUrl.query.theme);
}

let themeMain = localStorage.getItem('theme') || DEFAULT_THEME;

switch (themeMain) {
  case 'light':
  case 'dark':
    break;

  default:
    themeMain = DEFAULT_THEME;
    break;
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={{ main: themeMain }}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
