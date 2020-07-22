import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {I18nManager} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

import {PreferencesContext} from './context/preferencesContext';
import {
  defaultTheme,
  // darkTheme
} from './theme';

import {RootNavigator} from './rootNavigator';

export const Main = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(
    colorScheme === 'dark' ? 'dark' : 'light',
  );
  const [rtl] = React.useState(I18nManager.isRTL);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  const toggleRTL = React.useCallback(() => {
    I18nManager.forceRTL(!rtl);
  }, [rtl]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      toggleRTL,
      theme,
      rtl: rtl ? 'right' : 'left',
    }),
    [rtl, theme, toggleRTL, toggleTheme],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={defaultTheme}>
        <RootNavigator />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};
