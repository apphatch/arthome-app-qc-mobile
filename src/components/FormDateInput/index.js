import React from 'react';
import moment from 'moment';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { defaultTheme } from '../../theme';

const FormDateInput = (props) => {
  const {
    register,
    name,
    value = new Date(),
    setValue,
    label,
    rules,
    error,
    disabled = false,
    clearErrors,
  } = props;
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    if(localValue) {
      let date = moment(localValue, "DD-MM-YYYY", true);

      if(date.isValid()) {
        setValue(name, localValue, true);
      }
    }
  }, [name, register, rules, localValue, setValue]);

  const handleInputChange = React.useCallback(
    (val) => {
      let date = moment(val, "DD-MM-YYYY", true);

      if(date.isValid()) {
        setValue(name, val, true);
      }

      setLocalValue(val);
      clearErrors(name);
    },
    [name, setValue, clearErrors],
  );

  return (
    <>
      <Text style={styles.label}>
        {label}
      </Text>
      <View style={styles.container}>
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD-MM-YYYY'
          }}
          value={localValue}
          onChangeText={handleInputChange}
          refInput={register({ name }, rules)}
        />
      </View>
      {error ? (
          <Text accessibilityRole="text" style={styles.textRed}>
            Require
          </Text>
        ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingLeft: 4,
  },
  textRed: {
    color: 'red',
  },
  label: {
    color: 'grey',
    fontSize: 12,
  }
});

export default React.memo(FormDateInput);
