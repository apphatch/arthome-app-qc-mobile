import React, { memo } from 'react';
import moment from 'moment';
import { Appbar, FAB, Snackbar, Title, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import ImagePicker from '../..//components/ImagePicker';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// ###
import CustomSelect from '../../components/Select';
import NumberInput from '../../components/NumberInput';
import CustomToggleButton from '../../components/ToggleButton';
import DateTimePicker from '../../components/DateTimePicker';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';
import * as shopSelectors from '../ShopScreen/selectors';

const StockCheckListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    params: { clId, itemId, shopId, clType, stockName },
  } = route;

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isSubmitted = useSelector(selectors.makeSelectIsSubmitted());
  const errorMessage = useSelector(selectors.makeSelectErrorMessage());
  const template = useSelector(selectors.makeSelectTemplate(clId));
  const currentShopChecked = useSelector(
    shopSelectors.makeSelectShopById(shopId),
  );

  // const item = useSelector(selectors.makeSelectCheckListItemById(clId, itemId));
  const item = useSelector(selectors.makeSelectStockById(itemId));

  const [showSnack, setShowSnack] = React.useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    errors,
    clearErrors,
    trigger,
  } = useForm({});

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
    (values) => {
      dispatch(actions.submit({ itemId, data: values, shopId }));
    },
    [dispatch, itemId, shopId],
  );

  const isOOS = clType.toLowerCase() === 'oos';
  const isSOS = clType.toLowerCase() === 'sos';
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Kiểm tra lỗi'} subtitle="" />
      </Appbar.Header>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.form}>
              <Title style={styles.caption}>{stockName}</Title>
              {Object.keys(template).map((fieldName) => {
                const type = template[fieldName].type;
                if (type === 'input') {
                  return (
                    <NumberInput
                      key={fieldName}
                      name={fieldName}
                      label={fieldName}
                      register={register}
                      setValue={setValue}
                      value={item.data ? item.data[fieldName] : ''}
                      disabled={isLoading}
                      rules={{ required: true }}
                      error={errors[fieldName]}
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
                            item.data != null && item.data[fieldName] === val
                              ? 'purple'
                              : 'black',
                        };
                      })}
                      register={register}
                      setValue={setValue}
                      name={fieldName}
                      label={fieldName}
                      rules={{ required: true }}
                      error={errors[fieldName]}
                      value={item.data ? item.data[fieldName] : null}
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
                      rules={{ required: true }}
                      error={errors[fieldName]}
                      value={item.data ? item.data[fieldName] : ''}
                      disabled={isLoading}
                      clearErrors={clearErrors}
                    />
                  );
                }
                if (type === 'date') {
                  return (
                    <DateTimePicker
                      register={register}
                      setValue={setValue}
                      name={fieldName}
                      label={fieldName}
                      key={fieldName}
                      rules={{ required: true }}
                      error={errors[fieldName]}
                      value={
                        item.data
                          ? item.data[fieldName]
                          : moment(new Date()).format('DD/MM/YYYY')
                      }
                      disabled={isLoading}
                      clearErrors={clearErrors}
                    />
                  );
                }
              })}
              {!isOOS && !isSOS && (
                <ImagePicker
                  setValue={setValue}
                  isSubmitting={isLoading}
                  register={register}
                  triggerValidation={trigger}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
      {
        <FAB
          visible={true}
          style={[styles.fab]}
          icon="content-save-all"
          onPress={handleSubmit(onSubmitCheckList)}
        />
      }
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: defaultTheme.colors.background,
  },
});

export default memo(StockCheckListScreen);
