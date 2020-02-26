import React, {memo} from 'react';
import {
  Appbar,
  List,
  Divider,
  useTheme,
  Searchbar,
  Caption,
  IconButton,
} from 'react-native-paper';
import {View, StyleSheet, FlatList, Vibration} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {RNCamera} from 'react-native-camera';
import {
  useBarcodeRead,
  BarcodeMaskWithOuterLayout,
} from '@nartc/react-native-barcode-mask';

// ###
import {data} from './data';
import {defaultTheme} from '../../theme';

const ShopScreen = ({navigation, route}) => {
  const safeArea = useSafeArea();
  const {colors} = useTheme();
  const [isFocusSearchInput, setIsFocusSearchInput] = React.useState(false);
  const [isShowScanBarCode, setIsShowScanBarCode] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [isBarcodeRead, setIsBarcodeRead] = React.useState(false);

  React.useEffect(() => {
    if (route.params?.barCode) {
      setSearchText(route.params.barCode);
    }
  }, [route.params]);

  const {
    // barcodeRead,
    onBarcodeRead,
    onBarcodeFinderLayoutChange,
  } = useBarcodeRead(
    true,
    // eslint-disable-next-line no-shadow
    data => data,
    processed => {
      scanProcessed(processed);
    },
  );

  const scanProcessed = React.useCallback(
    barCode => {
      if (!isBarcodeRead) {
        Vibration.vibrate();
        setIsBarcodeRead(true);
        setIsShowScanBarCode(false);
        setSearchText(barCode);
      }
    },
    [isBarcodeRead],
  );

  const renderItem = ({item}) => (
    <List.Item
      title={item.title}
      description={item.description}
      // onPress={() => navigation.navigate('StockDetail')}
      onPress={() => {}}
    />
  );

  const keyExtractor = item => item.id;

  const _onSearchStockItem = text => {
    setSearchText(text);
  };

  const _onSubmitEditing = event => {
    console.log('TCL: ShopScreen -> text', event.target.value);
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

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() =>
            isShowScanBarCode
              ? setIsShowScanBarCode(false)
              : navigation.goBack()
          }
        />
        <Appbar.Content title="Của hàng 01" subtitle="" />
      </Appbar.Header>
      <View style={[styles.container]}>
        {isShowScanBarCode ? (
          <View style={styles.camContainer}>
            <RNCamera
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              style={styles.preview}
              captureAudio={false}
              onBarCodeRead={onBarcodeRead}>
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
            <Caption style={styles.caption}>
              Tìm kiếm bằng cách nhập tên hoặc quét barcode
            </Caption>
            <FlatList
              data={data}
              renderItem={renderItem}
              ItemSeparatorComponent={Divider}
              keyExtractor={keyExtractor}
              contentContainerStyle={{
                backgroundColor: colors.background,
                paddingBottom: safeArea.bottom + 16,
              }}
              ListHeaderComponent={
                <View style={styles.row}>
                  <Searchbar
                    placeholder="Tìm kiếm sản phẩm"
                    onChangeText={_onSearchStockItem}
                    value={searchText}
                    style={styles.searchbar}
                    onSubmitEditing={_onSubmitEditing}
                    icon={isFocusSearchInput ? 'keyboard-backspace' : 'magnify'}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                  />
                  <IconButton
                    icon="barcode-scan"
                    onPress={_onHandleScanBarCode}
                    size={28}
                  />
                </View>
              }
            />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
  },
  caption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchbar: {
    margin: 4,
    flex: 1,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    alignItems: 'center',
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

export default memo(ShopScreen);
