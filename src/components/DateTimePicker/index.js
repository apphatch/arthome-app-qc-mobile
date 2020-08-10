import React from 'react';
import moment from 'moment';
import { Caption, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimePicker = (props) => {
  const {
    register,
    name,
    value = new Date(),
    setValue,
    label = 'Date',
    rules,
    error,
    disabled = false,
    clearErrors,
  } = props;
  const newValue = value.toString().split('/');
  let newDate;
  if (newValue.length > 0) {
    newDate = new Date(newValue[2], newValue[1] - 1, newValue[0]);
  }
  const [date, setDate] = React.useState(newDate);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    register({ name }, rules);
    setValue(name, date, true);
  }, [name, register, rules, date, setValue]);

  const onConfirm = (newDate) => {
    setVisible(false);
    const formatDate = moment(newDate).format('DD/MM/YYYY');
    setDate(newDate);
    setValue(name, formatDate, true);
    clearErrors(name);
  };

  return (
    <>
      <View style={[styles.container]}>
        <Caption>{label}</Caption>
        <Text style={{ padding: 10 }} onPress={() => setVisible(label)}>
          {moment(date).format('DD/MM/YYYY')}
        </Text>
        <DateTimePickerModal
          isVisible={visible === label ? true : false}
          mode="date"
          date={date}
          onConfirm={onConfirm}
          onCancel={() => setVisible(false)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textRed: {
    color: 'red',
  },
});

export default React.memo(DateTimePicker);
