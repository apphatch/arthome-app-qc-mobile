import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ShopScreen from './ShopScreen';
import {StockScreenStack} from '../StockScreen';

const Stack = createStackNavigator();

export const ShopScreenStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="StockScreen" component={StockScreenStack} />
    </Stack.Navigator>
  );
};
