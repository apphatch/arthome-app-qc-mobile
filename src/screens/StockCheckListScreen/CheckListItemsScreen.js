import React, { memo } from 'react';
import { Appbar, useTheme, List, Divider, Searchbar } from 'react-native-paper';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import { defaultTheme } from '../../theme';
import * as selectors from './selectors';
import {
  logger,
  // useDebounce,
} from '../../utils';
import * as actions from './actions';
import { LoadingIndicator } from '../../components/LoadingIndicator';

const CheckListItemsScreen = ({ navigation, route }) => {
  const safeArea = useSafeArea();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const {
    params: { clId, shopId },
  } = route;

  const currentCheckList = useSelector(selectors.makeSelectCheckListById(clId));
  const countDone = useSelector(selectors.makeSelectIsDoneAll(clId));
  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isSubmittedDoneAll = useSelector(selectors.makeSelectIsDoneAlled());
  logger('countDone: ', countDone);
  const { checklist_items: checkListItems } = currentCheckList;

  const [searchText, setSearchText] = React.useState('');
  const [isFocusSearchInput, setIsFocusSearchInput] = React.useState(false);
  // const debouncedSearchTerm = useDebounce(searchText, 500);

  const searchRef = React.createRef();

  const renderItem = ({ item }) => (
    <List.Item
      title={item.stock_name}
      onPress={() => {
        navigation.navigate('FormScreen', { itemId: item.id, clId, shopId });
      }}
      right={props =>
        item.data ? (
          <List.Icon {...props} icon="check-circle" color="green" />
        ) : (
          <List.Icon {...props} icon="square-edit-outline" />
        )
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

  const onDoneAll = React.useCallback(() => {
    dispatch(actions.markDoneAll({ clId }));
  }, [dispatch, clId]);

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

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        />
        <Appbar.Content title={'Sản phẩm'} subtitle="" />
        <Appbar.Action
          icon={'upload'}
          disabled={countDone ? countDone.length > 0 : isLoading || true}
          onPress={onDoneAll}
        />
      </Appbar.Header>
      {isLoading ? (
        <LoadingIndicator />
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
});

export default memo(CheckListItemsScreen);
