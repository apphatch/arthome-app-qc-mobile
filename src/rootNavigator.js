import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// ### screens
import {
  LoginScreen,
  ShopNavigator,
  CheckInScreen,
  CheckOutScreen,
} from './screens';

import { StockStack } from './screens/StockCheckListScreen/Stack';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="ShopScreen"
          component={ShopNavigator}
          options={{ gestureEnabled: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="CheckInScreen"
          component={CheckInScreen}
          options={{ gestureEnabled: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="CheckOutScreen"
          component={CheckOutScreen}
          options={{ gestureEnabled: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="StockCheckListScreen"
          component={StockStack}
          options={{ gestureEnabled: false, animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
