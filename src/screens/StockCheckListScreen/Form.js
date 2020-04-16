import React, { memo } from 'react';
import { Appbar, FAB, Caption, Snackbar } from 'react-native-paper';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// ###
import CustomSwitch from '../../components/Switch';
import CustomSelect from '../../components/Select';
import FormTextInput from '../../components/FormTextInput';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';

const StockCheckListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    params: { clId, itemId, shopId },
  } = route;

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isSubmitted = useSelector(selectors.makeSelectIsSubmitted());
  const template = useSelector(selectors.makeSelectTemplate(clId));
  const item = useSelector(selectors.makeSelectCheckListItemById(clId, itemId));

  const [openFAB, setOpenFAB] = React.useState(false);
  const [showSnack, setShowSnack] = React.useState(false);

  const { handleSubmit, register, setValue, errors } = useForm({});

  React.useEffect(() => {
    if (!isLoading) {
      if (isSubmitted) {
        navigation.goBack();
      } else {
        setShowSnack(true);
      }
    }
  }, [isLoading, isSubmitted, navigation]);

  React.useEffect(() => {
    return () => dispatch(actions.resetProps());
  }, [dispatch]);

  const onSubmitCheckList = React.useCallback(
    values => {
      dispatch(actions.submit({ itemId, data: values, shopId }));
    },
    [dispatch, itemId, shopId],
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
                <FormTextInput
                  key={fieldName}
                  name={fieldName}
                  label={fieldName}
                  register={register}
                  setValue={setValue}
                  value={item.data ? item.data[fieldName] : ''}
                  disabled={!!item.data || isLoading}
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
                  value={item.data ? item.data[fieldName] : false}
                  disabled={!!item.data || isLoading}
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
                  disabled={!!item.data || isLoading}
                />
              );
            }
          })}
        </View>
        {item.data ? null : (
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
          // <FAB
          //   style={[styles.fab]}
          //   icon={'upload-outline'}
          //   onPress={() => {}}
          //   visible={true}
          //   label="Gửi"
          // />
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
    // bottom: 32,
    // right: 16,
  },
  form: {
    paddingHorizontal: 16,
  },
});

export default memo(StockCheckListScreen);
