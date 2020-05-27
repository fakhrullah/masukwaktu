
interface ThemeConfigInterface {
  webBackground: string;
  logoBackground: string;
  nonMainTimerColor: string;
  mainTimerColor: string;
}

const lightTheme: ThemeConfigInterface = {
  // html, body
  webBackground: '#fff',

  // header
  logoBackground: '#c4c4c4',

  // content
  nonMainTimerColor: '#dfdfdf',
  mainTimerColor: '#333',
};

const darkTheme: ThemeConfigInterface = {
  webBackground: '#222',

  // header
  logoBackground: '#000',

  // content
  nonMainTimerColor: '#000',
  mainTimerColor: '#999',
};

interface ThemesList {
  [key: string]: ThemeConfigInterface
}

const ThemesConfig: ThemesList = {
  light: lightTheme,
  dark: darkTheme,
};

export {
  ThemesConfig,
};
