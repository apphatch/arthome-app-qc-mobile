import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShopScreen from './ShopScreen';
// import { CheckInScreen } from '../CheckInScreen';
// import { StockScreen } from '../StockScreen';
// import { StockCheckListScreen } from '../StockCheckListScreen';

const Stack = createStackNavigator();

export const ShopScreenStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      {/* <Stack.Screen name="CheckInScreen" component={CheckInScreen} /> */}
      {/* <Stack.Screen name="StockScreen" component={StockScreen} /> */}
      {/* <Stack.Screen
        name="StockCheckListScreen"
        component={StockCheckListScreen}
      /> */}
    </Stack.Navigator>
  );
};
