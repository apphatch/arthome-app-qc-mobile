import React, { memo } from 'react';
import { Appbar, useTheme, List, Divider, Searchbar } from 'react-native-paper';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { defaultTheme } from '../../theme';
import * as selectors from './selectors';
import { useDebounce } from '../../utils';

const CheckListItemsScreen = ({ navigation, route }) => {
  console.log('Check list items -> route', route);
  const safeArea = useSafeArea();
  const { colors } = useTheme();

  const {
    params: { clId },
  } = route;

  const currentCheckList = useSelector(selectors.makeSelectCheckListById(clId));
  console.log('CheckListItemsScreen -> currentCheckList', currentCheckList);
  const { checklist_items: checkListItems } = currentCheckList;

  const [searchText, setSearchText] = React.useState('');
  const [isFocusSearchInput, setIsFocusSearchInput] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchText, 500);
  console.log(
    'CheckListItemsScreen -> debouncedSearchTerm',
    debouncedSearchTerm,
  );

  const searchRef = React.createRef();

  const renderItem = ({ item }) => (
    <List.Item
      title={item.stock_name}
      onPress={() => {
        navigation.navigate('FormScreen', { itemId: item.id, clId });
      }}
      right={props =>
        item.data ? (
          <List.Icon {...props} icon="check-circle" color="green" />
        ) : null
      }
    />
  );

  const keyExtractor = item => item.id.toString();

  const _onSearchStockItem = text => {
    setSearchText(text);
  };

  const _onFocus = () => {
    setIsFocusSearchInput(true);
  };
  const _onBlur = () => {
    setIsFocusSearchInput(false);
  };
  const _onIconPress = () => {
    searchRef.current && searchRef.current.blur();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Sản phẩm'} subtitle="" />
      </Appbar.Header>
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
      </View>
      <View style={[styles.container]}>
        <FlatList
          data={checkListItems}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            backgroundColor: colors.background,
            paddingBottom: safeArea.bottom,
          }}
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
});

export default memo(CheckListItemsScreen);
