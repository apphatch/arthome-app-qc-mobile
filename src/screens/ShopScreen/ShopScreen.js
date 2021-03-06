import React, { memo } from 'react';
import {
  Appbar,
  List,
  Colors,
  Divider,
  useTheme,
  Searchbar,
  Caption,
  Switch,
} from 'react-native-paper';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

// ###
import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { selectors as loginSelectors } from '../LoginScreen';
import { useDebounce } from '../../utils';

const ShopScreen = ({ navigation, route }) => {
  const safeArea = useSafeArea();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const shops = useSelector(selectors.makeSelectShops());
  const userId = useSelector(loginSelectors.makeSelectUserId());
  const isLoggedIn = useSelector(loginSelectors.makeSelectIsLoggedIn());

  const [searchText, setSearchText] = React.useState('');
  const [isFocusSearchInput, setIsFocusSearchInput] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);

  const debounceSearchTerm = useDebounce(searchText, 1000);

  const searchRef = React.createRef();

  useFocusEffect(
    React.useCallback(() => {
      if (isLoggedIn) {
        dispatch(
          actions.fetchShops({
            userId,
            search: debounceSearchTerm,
            filter: isFilter,
          }),
        );
      } else {
        navigation.navigate('LoginScreen');
      }
    }, [
      userId,
      dispatch,
      isLoggedIn,
      navigation,
      debounceSearchTerm,
      isFilter,
    ]),
  );

  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.full_address}
      onPress={() => {
        navigation.navigate('StockCheckListScreen', {
          screen: 'StockCheckListScreen',
          params: { shopId: item.id, shopName: item.name },
        });
      }}
      right={(props) =>
        item.completed ? (
          <List.Icon {...props} icon="account-check" color="green" />
        ) : null
      }
    />
  );

  const keyExtractor = (item) => item.id.toString();

  const _onSearchStockItem = (text) => {
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

  const onToggleFilter = () => {
    setIsFilter(!isFilter);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          size={25}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Danh sách cửa hàng" subtitle="" />
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
        <Switch value={isFilter} onValueChange={onToggleFilter} />
      </View>

      <View style={[styles.container]}>
        {isLoading ? (
          <LoadingIndicator />
        ) : shops && shops.length ? (
          <FlatList
            data={shops}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            keyExtractor={keyExtractor}
            contentContainerStyle={{
              backgroundColor: colors.background,
              paddingBottom: safeArea.bottom,
            }}
          />
        ) : (
          <Caption style={styles.caption}>Không tìm thấy kết quả</Caption>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
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
  caption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default memo(ShopScreen);
