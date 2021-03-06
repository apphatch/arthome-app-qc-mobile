import React from 'react';
import {View} from 'react-native';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import {styled} from '@ui-kitten/components';

const INSETS = {
  top: {
    toStyle: (insets, styles) => ({
      ...styles,
      paddingTop: insets.top,
    }),
  },
  bottom: {
    toStyle: (insets, styles) => ({
      ...styles,
      paddingBottom: insets.bottom,
    }),
  },
};

export class SafeAreaLayoutComponent extends React.Component {
  static styledComponentName = 'SafeAreaLayout';

  createInsets = (insets, safeAreaInsets, style) => {
    return React.Children.map(insets, inset =>
      INSETS[inset].toStyle(safeAreaInsets, style),
    );
  };

  renderComponent = safeAreaInsets => {
    const {style, insets, themedStyle, ...viewProps} = this.props;
    return (
      <View
        {...viewProps}
        style={[this.createInsets(insets, safeAreaInsets, themedStyle), style]}
      />
    );
  };

  render() {
    return <SafeAreaConsumer>{this.renderComponent}</SafeAreaConsumer>;
  }
}

export const SafeAreaLayout = styled(SafeAreaLayoutComponent);
