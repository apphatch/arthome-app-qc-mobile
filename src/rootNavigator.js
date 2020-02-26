import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

// ### screens
import {LoginScreen, ShopNavigator} from './screens';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ShopScreen" component={ShopNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
