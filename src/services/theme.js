import React from 'react';
import {Appearance} from 'react-native-appearance';

import {AppStorage} from './storage';

export class Theming {
  static MappingContext = React.createContext(null);
  static ThemeContext = React.createContext(null);

  static useMapping = (mappings, mapping) => {
    const setCurrentMapping = nextMapping => {
      AppStorage.setMapping(nextMapping);
    };
    const isEva = () => {
      return mapping === 'eva';
    };

    const mappingContext = {
      currentMapping: mapping,
      setCurrentMapping,
      isEva,
    };

    return [mappingContext, mappings[mapping]];
  };

  static useTheming = (themes, mapping, theme) => {
    const [currentTheme, setCurrentTheme] = React.useState(theme);
    React.useEffect(() => {
      const subscription = Appearance.addChangeListener(preferences => {
        const appearanceTheme = Theming.createAppearanceTheme(
          preferences.colorScheme,
          theme,
        );
        setCurrentTheme(appearanceTheme);
      });

      return () => subscription.remove();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const isDarkMode = () => {
      return currentTheme === 'dark';
    };

    const createTheme = upstreamTheme => {
      return {
        ...themes[mapping][currentTheme],
        ...themes[mapping][upstreamTheme][currentTheme],
      };
    };

    const themeContext = {
      currentTheme,
      setCurrentTheme: nextTheme => {
        AppStorage.setTheme(nextTheme);
        setCurrentTheme(nextTheme);
      },
      isDarkMode,
      createTheme,
    };

    return [themeContext, themes[mapping][currentTheme]];
  };

  static useTheme = upstreamTheme => {
    const themeContext = React.useContext(Theming.ThemeContext);
    return themeContext.createTheme(upstreamTheme);
  };

  static #createAppearanceTheme = (appearance, preferredTheme) => {
    if (appearance === 'no-preference') {
      return preferredTheme;
    }
    return appearance;
  };
}
