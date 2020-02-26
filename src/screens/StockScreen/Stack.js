import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StockScreen from './StockScreen';
// import ScanBarCode from './ScanBarCode';

const Stack = createStackNavigator();

export const StockScreenStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="StockScreen" component={StockScreen} />
      {/* <Stack.Screen name="ScanBarCode" component={ScanBarCode} /> */}
    </Stack.Navigator>
  );
};
