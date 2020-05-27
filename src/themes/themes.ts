
interface ThemeConfigInterface {
  webBackground: string;
  logoBackground: string;
  nonMainTimerColor: string;
  mainTimerColor: string;
  nextSolatAndLocationColor: string;
  sameZoneColor: string;
  waktuSolatBackground: string;
  waktuSolatColor: string;
  waktuSolatTimeColor: string;
  waktuSolatTimeFontWeight: string;
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

  waktuSolatBackground: '#c4c4c4',
  waktuSolatColor: '#767676',
  waktuSolatTimeColor: '#000',
  waktuSolatTimeFontWeight: 'bold',
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

  waktuSolatBackground: '#000',
  waktuSolatColor: '#777',
  waktuSolatTimeColor: '#ccc',
  waktuSolatTimeFontWeight: 'normal',
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
