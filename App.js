/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {YellowBox} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppearanceProvider} from 'react-native-appearance';

// ###
import {Main} from './src/main';

YellowBox.ignoreWarnings(['Require cycle:']);
enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <Main />
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
