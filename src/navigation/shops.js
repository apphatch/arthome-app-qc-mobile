import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {ShopDrawer} from '../scenes/shop/drawer';
import {Shop} from '../scenes/shop/home';

const Drawer = createDrawerNavigator();

export const ShopNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <ShopDrawer {...props} />}>
      <Drawer.Screen name="Shops" component={Shop} />
    </Drawer.Navigator>
  );
};
