import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './CheckInDrawer';
import { ShopScreenStack } from '../ShopScreen/Stack';

const Drawer = createDrawerNavigator();

export default function CheckInNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="ShopScreen" component={ShopScreenStack} />
    </Drawer.Navigator>
  );
}
