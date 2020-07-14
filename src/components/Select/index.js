import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native';
import { Caption, Text } from 'react-native-paper';

const CustomSelect = props => {
  const {
    options,
    register,
    setValue,
    name,
    label = '',
    rules,
    error,
    value,
    disabled = false,
    clearError,
  } = props;

  const [localValue, setLocalValue] = React.useState(value);
  const [localOptions, setLocalOptions] = React.useState(options);

  const updateStyleSelected = (val) => {
    localOptions.forEach(ele => {
      if(ele.value == val) {
        ele.color = 'purple';
      } else {
        ele.color = 'black';
      }
    });

    setLocalOptions(localOptions);
  };

  React.useEffect(() => {
    register({ name }, rules);
    setValue(name, localValue);
  }, [name, register, rules]);

  return (
    <>
      <View style={[styles.container]}>
        <Caption>{label}</Caption>
        <RNPickerSelect
          onValueChange={val => {
            setValue(name, val, true);
            setLocalValue(val);
            clearError(name);
            updateStyleSelected(val);
          }}
          items={localOptions}
          placeholder={{
            label: 'Chọn 1 item',
            value: null,
            color: '#9EA0A4',
          }}
          value={localValue}
          disabled={disabled}
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
    marginVertical: 10,
  },
  textRed: {
    color: 'red',
  },
});

export default React.memo(CustomSelect);
