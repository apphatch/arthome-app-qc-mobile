import React, { memo } from 'react';
import {
  Appbar,
  useTheme,
  List,
  Divider,
  Searchbar,
  IconButton,
} from 'react-native-paper';
import { StyleSheet, View, FlatList, Alert, Vibration } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  useBarcodeRead,
  BarcodeMaskWithOuterLayout,
} from '@nartc/react-native-barcode-mask';

import { LoadingIndicator } from '../../components/LoadingIndicator';

import { defaultTheme } from '../../theme';
import * as selectors from './selectors';
import { useDebounce } from '../../utils';
import * as actions from './actions';
import { RNCamera } from 'react-native-camera';

const CheckListItemsScreen = ({ navigation, route }) => {
  const safeArea = useSafeArea();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const {
    params: { clId, shopId, clType },
  } = route;

  const stocks = useSelector(selectors.makeSelectStocks());
  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isSubmittedDoneAll = useSelector(selectors.makeSelectIsDoneAlled());
  const [searchText, setSearchText] = React.useState('');
  const [isFocusSearchInput, setIsFocusSearchInput] = React.useState(false);
  const debounceSearchTerm = useDebounce(searchText, 1000);
  const [toIndex, setToIndex] = React.useState(0);
  const [isBarcodeRead, setIsBarcodeRead] = React.useState(false);
  const [isShowScanBarCode, setIsShowScanBarCode] = React.useState(false);

  const searchRef = React.createRef();
  let flatListRef = React.createRef();

  React.useEffect(() => {
    if (toIndex > 0) {
      scrollToPosition();
    }
  }, [scrollToPosition, toIndex]);

  React.useEffect(() => {
    dispatch(
      actions.fetchStocks({
        search: debounceSearchTerm,
        checkListId: clId,
      }),
    );
  }, [debounceSearchTerm, clId, dispatch]);

  const {
    barcodeRead,
    onBarcodeRead,
    onBarcodeFinderLayoutChange,
  } = useBarcodeRead(
    true,
    (data) => {
      // console.log(data);
      return data;
    },
    (processed) => {
      scanProcessed(processed);
    },
  );

  const scanProcessed = React.useCallback(
    (barCode) => {
      if (!isBarcodeRead) {
        Vibration.vibrate();
        setIsBarcodeRead(true);
        setIsShowScanBarCode(false);
        setSearchText(barCode);
      }
    },
    [isBarcodeRead],
  );

  const getItemLayout = (data, index) => {
    return { length: stocks.length, offset: 56 * index, index };
  };

  const scrollToPosition = React.useCallback(() => {
    if (toIndex > 0 && flatListRef) {
      flatListRef.scrollToIndex({ animated: true, index: toIndex });
    }
  }, [flatListRef, toIndex]);

  const renderItem = ({ item, index }) => {
    return (
      <List.Item
        title={item.stock_name}
        titleNumberOfLines={3}
        onPress={() => {
          setToIndex(index);
          navigation.navigate('CheckProblemScreen', {
            itemId: item.id,
            clId,
            clType,
          });
        }}
        right={(props) =>
          !_.isEmpty(item.data) &&
          item.data.records &&
          item.data.records.length > 0 ? (
            <List.Icon {...props} icon="check-circle" color="green" />
          ) : (
            <List.Icon {...props} icon="square-edit-outline" />
          )
        }
        disabled={isLoading}
      />
    );
  };

  const keyExtractor = (item) => item.id.toString();

  const _onSearchStockItem = (text) => {
    setSearchText(text);
  };

  const _onHandleScanBarCode = React.useCallback(() => {
    setIsShowScanBarCode(true);
    setIsBarcodeRead(false);
  }, []);

  const _onFocus = () => {
    setIsFocusSearchInput(true);
  };
  const _onBlur = () => {
    setIsFocusSearchInput(false);
  };
  const _onIconPress = () => {
    searchRef.current && searchRef.current.blur();
  };

  const onDoneAll = React.useCallback(() => {
    dispatch(actions.markDoneAll({ clId, clType }));
  }, [dispatch, clId, clType]);

  const showAlert = React.useCallback(() => {
    Alert.alert(
      'Thông báo',
      'Gửi báo cáo thành công',
      [{ text: 'OK', onPress: () => dispatch(actions.resetProps()) }],
      { cancelable: false },
    );
  }, [dispatch]);

  React.useEffect(() => {
    if (isSubmittedDoneAll) {
      showAlert();
    }
  }, [isSubmittedDoneAll, showAlert]);

  const _onPressGoBack = () => {
    if (isShowScanBarCode) {
      setIsShowScanBarCode(false);
    } else {
      navigation.goBack();
      dispatch(actions.fetchCheckList({ shopId }));
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={_onPressGoBack} disabled={isLoading} />
        <Appbar.Content title={'Sản phẩm'} />
        {/* <Appbar.Action icon={'upload'} onPress={onDoneAll} /> */}
      </Appbar.Header>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <View style={[styles.container]}>
            {isShowScanBarCode ? (
              <View style={styles.camContainer}>
                <RNCamera
                  androidCameraPermissionOptions={{
                    title: 'permissionCamera',
                    message: 'permissionCameraMessage',
                    buttonPositive: 'ok',
                    buttonNegative: 'cancel',
                  }}
                  style={styles.preview}
                  type={RNCamera.Constants.Type.back}
                  onBarCodeRead={onBarcodeRead}
                  captureAudio={false}
                  onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    if (
                      barcodes &&
                      barcodes.length > 0 &&
                      barcodes[0].type.toUpperCase() !== 'UNKNOWN_FORMAT'
                    ) {
                      console.log(barcodes);

                      scanProcessed(barcodes[0].data);
                    }
                  }}>
                  <BarcodeMaskWithOuterLayout
                    maskOpacity={0.5}
                    width={'90%'}
                    height={'60%'}
                    onLayoutChange={onBarcodeFinderLayoutChange}
                    showAnimatedLine={false}
                  />
                </RNCamera>
              </View>
            ) : (
              <>
                <View style={styles.row}>
                  <Searchbar
                    placeholder="Tìm kiếm..."
                    onChangeText={_onSearchStockItem}
                    value={searchText}
                    style={styles.searchbar}
                    icon={isFocusSearchInput ? 'keyboard-backspace' : 'magnify'}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    onIconPress={_onIconPress}
                    ref={searchRef}
                    autoCorrect={false}
                    autoCompleteType="off"
                    spellCheck={false}
                  />
                  <IconButton
                    icon="barcode-scan"
                    onPress={_onHandleScanBarCode}
                    size={28}
                  />
                </View>
                <FlatList
                  data={stocks}
                  ref={(ref) => {
                    flatListRef = ref;
                  }}
                  renderItem={renderItem}
                  getItemLayout={getItemLayout}
                  ItemSeparatorComponent={Divider}
                  keyExtractor={keyExtractor}
                  contentContainerStyle={{
                    backgroundColor: colors.background,
                    paddingBottom: safeArea.bottom,
                  }}
                  initialNumToRender={toIndex || 15}
                />
              </>
            )}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: defaultTheme.colors.background,
  },
  searchbar: {
    margin: 4,
    flex: 1,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  camContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default memo(CheckListItemsScreen);
