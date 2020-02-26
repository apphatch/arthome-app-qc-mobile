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
import {View, StyleSheet, FlatList} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

// ###
import {data} from './data';
import {defaultTheme} from '../../theme';

const ShopScreen = ({navigation}) => {
  const safeArea = useSafeArea();
  const {colors} = useTheme();
  const [isFocusSearchInput, setIsFocusSearchInput] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const renderItem = ({item}) => (
    <List.Item
      title={item.title}
      description={item.description}
      onPress={() => navigation.navigate('StockDetail')}
    />
  );

  const keyExtractor = item => item.id;

  const _onSearchStockItem = text => {
    setSearchText(text);
  };

  const _onSubmitEditing = event => {
    console.log('TCL: ShopScreen -> text', event.target.value);
  };

  const _onHandleScanBarCode = () => {};

  const _onFocus = () => {
    setIsFocusSearchInput(true);
  };
  const _onBlur = () => {
    setIsFocusSearchInput(false);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Của hàng 01" subtitle="" />
      </Appbar.Header>
      <View style={[styles.container]}>
        <Caption style={styles.caption}>
          Tìm kiếm bằng cách nhập tên hoặc quét barcode
        </Caption>

        {/* <Caption style={styles.caption}>Kết quả tìm kiếm</Caption> */}
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
});

export default memo(ShopScreen);
