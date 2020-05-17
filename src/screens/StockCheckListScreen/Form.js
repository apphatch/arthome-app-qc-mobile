import React, { memo } from 'react';
import { Appbar, FAB, Snackbar, Title } from 'react-native-paper';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';

// ###
import CustomSwitch from '../../components/Switch';
import CustomSelect from '../../components/Select';
import FormTextInput from '../../components/FormTextInput';
import NumberInput from '../../components/NumberInput';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';
import { logger } from '../../utils';

const StockCheckListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    params: { clId, itemId, shopId, clType, stockName },
  } = route;

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isSubmitted = useSelector(selectors.makeSelectIsSubmitted());
  const errorMessage = useSelector(selectors.makeSelectErrorMessage());
  const template = useSelector(selectors.makeSelectTemplate(clId));
  logger('StockCheckListScreen -> template', template);
  const item = useSelector(selectors.makeSelectCheckListItemById(clId, itemId));
  logger('StockCheckListScreen -> item', item);

  const [showSnack, setShowSnack] = React.useState(false);

  const { handleSubmit, register, setValue, errors, clearError } = useForm({});

  React.useEffect(() => {
    if (!isLoading) {
      if (isSubmitted) {
        navigation.goBack();
      } else {
        if (errorMessage && errorMessage.length) {
          setShowSnack(true);
        }
      }
    }
  }, [isLoading, isSubmitted, navigation, errorMessage]);

  React.useEffect(() => {
    return () => dispatch(actions.resetProps());
  }, [dispatch]);

  const onSubmitCheckList = React.useCallback(
    values => {
      dispatch(actions.submit({ itemId, data: values, shopId }));
    },
    [dispatch, itemId, shopId],
  );

  const isSOS = clType === 'SOS';

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Kiểm tra lỗi'} subtitle="" />
      </Appbar.Header>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.form}>
          <Title style={styles.caption}>{stockName}</Title>
          {Object.keys(template).map(fieldName => {
            const type = template[fieldName].type;
            if (type === 'input') {
              if (isSOS) {
                return (
                  <NumberInput
                    key={fieldName}
                    name={fieldName}
                    label={fieldName}
                    register={register}
                    setValue={setValue}
                    value={item.data ? item.data[fieldName] : ''}
                    disabled={!isEmpty(item.data) || isLoading}
                    rules={{ required: true }}
                    error={errors[fieldName]}
                    clearError={clearError}
                  />
                );
              } else {
                return (
                  <FormTextInput
                    key={fieldName}
                    name={fieldName}
                    label={fieldName}
                    register={register}
                    setValue={setValue}
                    value={item.data ? item.data[fieldName] : ''}
                    disabled={!isEmpty(item.data) || isLoading}
                    clearError={clearError}
                  />
                );
              }
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
                  value={item.data ? item.data[fieldName] : false}
                  disabled={!isEmpty(item.data) || isLoading}
                  clearError={clearError}
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
                  value={item.data ? item.data[fieldName] : undefined}
                  disabled={!isEmpty(item.data) || isLoading}
                  clearError={clearError}
                />
              );
            }
          })}
        </View>
        {!isEmpty(item.data) ? null : (
          <FAB
            visible={true}
            style={[styles.fab]}
            icon="check-all"
            label="Gửi"
            onPress={handleSubmit(onSubmitCheckList)}
          />
        )}
      </KeyboardAvoidingView>

      <Snackbar
        visible={showSnack}
        onDismiss={() => setShowSnack(false)}
        duration={4000}>
        Gửi lỗi không thành công
      </Snackbar>
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
    bottom: 32,
    right: 16,
  },
  form: {
    paddingHorizontal: 16,
  },
});

export default memo(StockCheckListScreen);
