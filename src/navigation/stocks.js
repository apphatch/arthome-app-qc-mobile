import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {StockTabBar} from '../scenes/stocks/stock-tabbar';
import {Stocks} from '../scenes/stocks';

const TopTab = createMaterialTopTabNavigator();

export const StocksNavigator = () => {
  return (
    <TopTab.Navigator tabBar={props => <StockTabBar {...props} />}>
      <TopTab.Screen name="Stocks" component={Stocks} />
      <TopTab.Screen name="StockBarCode" component={Stocks} />
    </TopTab.Navigator>
  );
};
