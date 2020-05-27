
interface ThemeConfigInterface {
  webBackground: string;
  logoBackground: string;
}

const lightTheme: ThemeConfigInterface = {
  // html, body
  webBackground: '#fff',

  // header
  logoBackground: '#c4c4c4',
};

const darkTheme: ThemeConfigInterface = {
  webBackground: '#222',

  // header
  logoBackground: '#000',
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
