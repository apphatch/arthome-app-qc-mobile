import React from 'react';
import moment from 'moment';
import { Caption, Text, Button } from 'react-native-paper';
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
  let newDate;
  if (value) {
    const splitValue = value.toString().split('T');
    if (splitValue.length > 2) {
      newDate = value;
    } else {
      const newValue = splitValue[0].split('-');
      if (newValue.length > 0) {
        newDate = new Date(newValue[0], newValue[1] - 1, newValue[2]);
      }
    }
  }
  const [date, setDate] = React.useState(newDate);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    register({ name }, rules);
    setValue(name, date, true);
  }, [name, register, rules, date, setValue]);

  const onConfirm = (dateValue) => {
    setVisible(false);
    const formatDate = moment(dateValue).format();
    setDate(dateValue);
    setValue(name, formatDate, true);
    clearErrors(name);
  };

  return (
    <>
      <View style={[styles.container]}>
        <Caption>{label}</Caption>
        <Button
          mode="text"
          color="black"
          uppercase={false}
          onPress={() => setVisible(label)}>
          {date ? moment(date).format('DD/MM/YYYY') : 'Chọn ngày'}
        </Button>

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
