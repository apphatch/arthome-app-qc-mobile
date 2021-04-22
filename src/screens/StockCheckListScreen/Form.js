import React, { memo } from 'react';
import Config from 'react-native-config';

import { Appbar, FAB, Snackbar, Title, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// ###
import CustomSelect from '../../components/Select';
import NumberInput from '../../components/NumberInput';
import CustomToggleButton from '../../components/ToggleButton';
import DateTimePicker from '../../components/DateTimePicker';
import FormTextInput from '../../components/FormTextInput';
// import TakePhoto from '../../components/TakePhoto';
import SelectPhoto from './components/SelectPhoto';
import FormDateInput from '../../components/FormDateInput';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';

const FormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    params: { clId, itemId, clType, stockName, role, record, recordId },
  } = route;

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isSubmitted = useSelector(selectors.makeSelectIsSubmitted());
  const errorMessage = useSelector(selectors.makeSelectErrorMessage());
  const template = useSelector(selectors.makeSelectTemplate(clId));

  const [showSnack, setShowSnack] = React.useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    clearErrors,
    getValues,
    trigger,
  } = useForm({ mode: 'onChange' });

  React.useEffect(() => {
    if (!isLoading) {
      if (isSubmitted) {
        dispatch(actions.resetProps());
        navigation.goBack();
      } else {
        if (errorMessage && errorMessage.length) {
          setShowSnack(true);
        }
      }
    }
  }, [isLoading, isSubmitted, navigation, errorMessage, dispatch]);

  const onSubmitCheckList = React.useCallback(
    (values) => {
      console.log('Form data', values);
      dispatch(actions.submit({ itemId, data: values, recordId }));
    },
    [dispatch, itemId, recordId],
  );

  const isOOS = clType.toLowerCase() === 'oos';
  const isSOS = clType.toLowerCase() === 'sos';
  const warningLevel =
    template !== null && template !== undefined
      ? Object.keys(template)[Object.keys(template).length - 1]
      : undefined;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        />
        <Appbar.Content title={'Kiểm tra lỗi'} subtitle="" />
      </Appbar.Header>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.form}>
              <Title style={styles.caption}>{stockName}</Title>
              {Object.keys(template).map((fieldName) => {
                const type = template[fieldName].type;
                const required = template[fieldName].required;
                if (type === 'number') {
                  if (role !== 'hpc') {
                    return (
                      <NumberInput
                        key={fieldName}
                        name={fieldName}
                        label={fieldName}
                        register={register}
                        setValue={setValue}
                        value={
                          record && record[fieldName] ? record[fieldName] : ''
                        }
                        disabled={isLoading}
                        rules={{ required }}
                        error={errors[fieldName] || null}
                        clearErrors={clearErrors}
                      />
                    );
                  }
                }
                if (type === 'input') {
                  return (
                    <FormTextInput
                      key={fieldName}
                      name={fieldName}
                      label={fieldName}
                      register={register}
                      setValue={setValue}
                      value={
                        record && record[fieldName] ? record[fieldName] : ''
                      }
                      disabled={isLoading}
                      rules={{ required }}
                      error={errors[fieldName] || null}
                      clearErrors={clearErrors}
                    />
                  );
                }
                if (type === 'select') {
                  return (
                    <CustomSelect
                      key={fieldName}
                      options={template[fieldName].values.map((val) => {
                        return {
                          value: val,
                          label: val,
                          color:
                            record != null && record[fieldName] === val
                              ? 'purple'
                              : 'black',
                        };
                      })}
                      register={register}
                      setValue={setValue}
                      name={fieldName}
                      label={fieldName}
                      rules={{ required }}
                      error={errors[fieldName] || null}
                      value={
                        record && record[fieldName]
                          ? record[fieldName]
                          : template[fieldName].values[0]
                      }
                      disabled={isLoading}
                      clearErrors={clearErrors}
                    />
                  );
                }
                if (type === 'radio') {
                  return (
                    <CustomToggleButton
                      options={template[fieldName].values}
                      register={register}
                      setValue={setValue}
                      name={fieldName}
                      label={fieldName}
                      key={fieldName}
                      rules={{ required }}
                      error={errors[fieldName] || null}
                      value={
                        record && record[fieldName] ? record[fieldName] : ''
                      }
                      disabled={isLoading}
                      clearErrors={clearErrors}
                    />
                  );
                }
                if (type === 'date') {
                  // return (
                  //   <DateTimePicker
                  //     register={register}
                  //     setValue={setValue}
                  //     name={fieldName}
                  //     label={fieldName}
                  //     key={fieldName}
                  //     rules={{ required }}
                  //     error={errors[fieldName] || null}
                  //     value={
                  //       record && record[fieldName] ? record[fieldName] : null
                  //     }
                  //     disabled={isLoading}
                  //     clearErrors={clearErrors}
                  //   />
                  // );
                  return (
                    <FormDateInput
                      register={register}
                      setValue={setValue}
                      name={fieldName}
                      label={fieldName}
                      key={fieldName}
                      rules={{
                        required,
                      }}
                      error={errors[fieldName] || null}
                      value={
                        record && record[fieldName] ? record[fieldName] : null
                      }
                      disabled={isLoading}
                      clearErrors={clearErrors}
                    />
                  );
                }
              })}
              {!isOOS && !isSOS && (
                <>
                  <SelectPhoto
                    name="photo"
                    setValue={setValue}
                    isSubmitting={isLoading}
                    register={register}
                    triggerValidation={trigger}
                    value={
                      recordId !== null && record && record.photo_uri
                        ? `${Config.API_HOST}${record.photo_uri}`
                        : null
                    }
                    rules={{
                      required:
                        getValues(warningLevel) === 'Xanh' ||
                        getValues(warningLevel) === undefined
                          ? false
                          : true,
                    }}
                    recordId={recordId}
                  />
                  {errors.photo ? (
                    <Paragraph style={{ color: 'red', textAlign: 'center' }}>
                      Cần chụp hình
                    </Paragraph>
                  ) : null}
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <FAB
        visible={true}
        style={[styles.fab]}
        icon="content-save-all"
        onPress={handleSubmit(onSubmitCheckList)}
        disabled={isLoading}
      />
      <Snackbar
        visible={showSnack}
        onDismiss={() => setShowSnack(false)}
        duration={4000}>
        {errorMessage}
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: defaultTheme.colors.background,
  },
});

export default memo(FormScreen);
