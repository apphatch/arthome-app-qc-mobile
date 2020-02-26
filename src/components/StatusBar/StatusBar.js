import React from 'react';
import {StatusBar as RNStatusBar} from 'react-native';
import {styled} from '@ui-kitten/components';

class StatusBarComponent extends React.Component {
  static styledComponentName = 'StatusBar';

  render() {
    const {themedStyle, ...statusBarProps} = this.props;

    return <RNStatusBar {...themedStyle} {...statusBarProps} />;
  }
}

export const StatusBar = styled(StatusBarComponent);
