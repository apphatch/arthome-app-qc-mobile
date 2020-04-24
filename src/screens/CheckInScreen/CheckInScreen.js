import React, { memo } from 'react';
import { Appbar, Caption } from 'react-native-paper';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// ###
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

import TakePhoto from './components/TakePhoto';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';

const CheckInScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isCheckIn = useSelector(selectors.makeSelectIsCheckIn());

  const {
    params: { shopId },
  } = route;

  const {
    register,
    setValue,
    handleSubmit,
    errors,
    formState,
    triggerValidation,
  } = useForm({
    mode: 'onChange',
  });

  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (isCheckIn) {
      navigation.navigate('StockCheckListScreen', {
        screen: 'StockCheckListScreen',
        params: { shopId },
      });
    }
  }, [isCheckIn, navigation, shopId]);

  const onSubmitCheckList = React.useCallback(
    values => {
      dispatch(actions.requestCheckIn({ ...values, shopId, setError }));
    },
    [dispatch, shopId],
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Check in'} subtitle="" />
      </Appbar.Header>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Caption style={styles.caption}>Thông tin</Caption>
        <TextInput
          label="Ghi chú"
          ref={register({ name: 'note' })}
          onChangeText={text => setValue('note', text, true)}
          disabled={isLoading}
        />

        <TakePhoto
          setValue={setValue}
          isSubmitting={isLoading}
          register={register}
          triggerValidation={triggerValidation}
        />
        {errors.photo ? <Paragraph>Cần chụp hình</Paragraph> : null}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmitCheckList)}
          loading={isLoading}
          disabled={isLoading || !formState.isValid}>
          Check in
        </Button>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
    paddingHorizontal: 10,
  },
  caption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
  },
});

export default memo(CheckInScreen);