import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export const LoadingIndicator = props => {
  const theme = useTheme();
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator animating={true} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
