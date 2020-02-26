import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {defaultTheme} from '../../theme';

const Paragraph = ({children}) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: defaultTheme.colors.secondary,
    textAlign: 'center',
    marginBottom: 14,
  },
});

export default memo(Paragraph);
