import React from 'react';
import { Switch, Caption, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const CustomSwitch = props => {
  const {
    register,
    name,
    value = false,
    setValue,
    label = 'Switch',
    rules,
    error,
  } = props;
  console.log('error', name, error);

  const [isSwitchOn, setIsSwitchOn] = React.useState(value);

  React.useEffect(() => {
    register({ name }, rules);
  }, [name, register, rules]);

  return (
    <>
      <View style={[styles.container]}>
        <Caption>{label}</Caption>
        <Switch
          onValueChange={() => {
            setIsSwitchOn(!isSwitchOn);
            setValue(name, !isSwitchOn, true);
          }}
          value={isSwitchOn}
        />
      </View>
      {error ? (
        <Text accessibilityRole="text" style={styles.textRed}>
          Required
        </Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textRed: {
    color: 'red',
  },
});

export default React.memo(CustomSwitch);
