import {AsyncStorage, YellowBox} from 'react-native';

const MAPPING_KEY = 'mapping';
const THEME_KEY = 'theme';

export class AppStorage {
  static getMapping = fallback => {
    return AsyncStorage.getItem(MAPPING_KEY).then(mapping => {
      return mapping || fallback;
    });
  };

  static getTheme = fallback => {
    return AsyncStorage.getItem(THEME_KEY).then(theme => {
      return theme || fallback;
    });
  };

  static setMapping = mapping => {
    return AsyncStorage.setItem(MAPPING_KEY, mapping);
  };

  static setTheme = theme => {
    return AsyncStorage.setItem(THEME_KEY, theme);
  };
}

/**
 * In a Bare React Native project you should use
 * https://github.com/react-native-community/async-storage
 *
 * However, Expo runs AsyncStorage exported from react-native.
 * Just to save application bundle size, we still using this one.
 */
YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);
