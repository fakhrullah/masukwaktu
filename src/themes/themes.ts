
interface ThemeConfigInterface {
  webBackground: string;
  logoBackground: string;
  nonMainTimerColor: string;
  mainTimerColor: string;
  nextSolatAndLocationColor: string;
  sameZoneColor: string;
}

const lightTheme: ThemeConfigInterface = {
  // html, body
  webBackground: '#fff',

  // header
  logoBackground: '#c4c4c4',

  // content
  nonMainTimerColor: '#dfdfdf',
  mainTimerColor: '#333',

  nextSolatAndLocationColor: '#787878',
  sameZoneColor: '#c5c5c5',
};

const darkTheme: ThemeConfigInterface = {
  webBackground: '#222',

  // header
  logoBackground: '#000',

  // content
  nonMainTimerColor: '#000',
  mainTimerColor: '#ccc',

  nextSolatAndLocationColor: '#999',
  sameZoneColor: '#777',
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
