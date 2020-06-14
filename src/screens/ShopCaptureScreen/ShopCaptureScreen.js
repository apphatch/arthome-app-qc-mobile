import React, { memo } from 'react';
import { Appbar, Caption, Snackbar, List, useTheme } from 'react-native-paper';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import ImagePicker from 'react-native-image-crop-picker';

// ###
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import ImagePicker from '../../components/ImagePicker';

// import TakePhoto from '../CheckInScreen/components/TakePhoto';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';
// import * as shopSelectors from '../ShopScreen/selectors';

import { logger } from '../../utils';

const ShopCaptureScreen = ({ navigation, route }) => {
  const {
    params: { shopId, shopName },
  } = route;

  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const errorMessage = useSelector(selectors.makeSelectErrorMessage());

  // const currentShopChecked = useSelector(
  //   shopSelectors.makeSelectShopById(shopId),
  // );

  const {
    register,
    setValue,
    handleSubmit,
    // errors,
    // formState,
    // triggerValidation,
  } = useForm({
    mode: 'onChange',
  });

  const [photos, setPhotos] = React.useState([]);

  const onSubmitCheckList = React.useCallback(
    values => {
      if (photos.length) {
        dispatch(
          actions.requestShopPicture({ ...values, photos, shopId, navigation }),
        );
      }
    },
    [photos, dispatch, shopId, navigation],
  );

  const onDismiss = React.useCallback(() => {
    dispatch(actions.setError(''));
  }, [dispatch]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={shopName} subtitle="" />
      </Appbar.Header>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          contentContainerStyle={
            {
              // flexDirection: 'column',
            }
          }>
          <Caption style={styles.caption}>Thông tin</Caption>
          <TextInput
            label="Ghi chú"
            ref={register({ name: 'note' })}
            onChangeText={text => setValue('note', text, true)}
            disabled={isLoading}
          />

          <ImagePicker
            photos={photos}
            setPhotos={setPhotos}
            isLoading={isLoading}
          />
          {/* <TakePhoto
          setValue={setValue}
          isSubmitting={isLoading}
          register={register}
          triggerValidation={triggerValidation}
          shop={currentShopChecked}
        /> */}
          {!photos.length ? <Paragraph>Cần chọn hình ảnh</Paragraph> : null}

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmitCheckList)}
            // onPress={() => {}}
            loading={isLoading}
            disabled={isLoading}>
            Gửi
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
      <Snackbar
        visible={!isLoading && !!errorMessage}
        onDismiss={onDismiss}
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
    paddingHorizontal: 10,
    flexDirection: 'row',
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
    // justifyContent: 'center',
    // paddingVertical: 8,
    // paddingHorizontal: 16,

    flexWrap: 'wrap',
  },
  textInput: {
    flex: 1,
  },
});

export default memo(ShopCaptureScreen);
