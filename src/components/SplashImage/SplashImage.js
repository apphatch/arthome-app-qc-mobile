// import React from 'react';
import { NativeModules } from 'react-native';

const SplashImage = props => {
  if (!props.loading) {
    NativeModules.SplashScreen.close({
      animationType: 2,
      duration: 500,
    });
  }

  return null;
};

export default SplashImage;
