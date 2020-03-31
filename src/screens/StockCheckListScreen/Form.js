import React, { memo } from 'react';
import { Appbar, FAB, Caption } from 'react-native-paper';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// ###
import TextInput from '../../components/TextInput';
import CustomSwitch from '../../components/Switch';
import CustomSelect from '../../components/Select';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';

const StockCheckListScreen = ({ navigation, route }) => {
  console.log('StockCheckListScreen -> route', route);
  const dispatch = useDispatch();

  const {
    params: { clId, itemId },
  } = route;

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const template = useSelector(selectors.makeSelectTemplate(clId));

  const [openFAB, setOpenFAB] = React.useState(false);

  const { handleSubmit, register, setValue, errors } = useForm();

  const onSubmitCheckList = React.useCallback(
    values => {
      console.log('StockCheckListScreen -> values', values);
      dispatch(actions.submit({ itemId, data: values }));
    },
    [dispatch, itemId],
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Kiểm tra lỗi'} subtitle="" />
      </Appbar.Header>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.form}>
          <Caption style={styles.caption}>Danh sách lỗi</Caption>
          {Object.keys(template).map(fieldName => {
            const type = template[fieldName].type;
            if (type === 'text') {
              return (
                <TextInput
                  key={fieldName}
                  label={fieldName}
                  ref={register({ name: fieldName })}
                  onChangeText={text => setValue(fieldName, text, true)}
                />
              );
            }
            if (type === 'checkbox') {
              return (
                <CustomSwitch
                  register={register}
                  setValue={setValue}
                  name={fieldName}
                  label={fieldName}
                  key={fieldName}
                  rules={{ required: true }}
                  error={errors[fieldName]}
                />
              );
            }
            if (type === 'select') {
              return (
                <CustomSelect
                  key={fieldName}
                  options={template[fieldName].values.map(val => {
                    return { value: val, label: val };
                  })}
                  register={register}
                  setValue={setValue}
                  name={fieldName}
                  label={fieldName}
                  rules={{ required: true }}
                  error={errors[fieldName]}
                />
              );
            }
          })}
        </View>

        <FAB.Group
          style={[styles.fab]}
          icon={openFAB ? 'close' : 'format-list-bulleted-type'}
          onPress={() => {}}
          onStateChange={({ open }) => setOpenFAB(open)}
          open={openFAB}
          actions={[
            {
              icon: 'check-all',
              label: 'Gửi',
              onPress: handleSubmit(onSubmitCheckList),
            },
          ]}
          visible={true}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
  },
  caption: {
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
  },
  form: {
    paddingHorizontal: 16,
  },
});

export default memo(StockCheckListScreen);
