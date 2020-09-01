import React, { memo } from 'react';
import {
  Appbar,
  useTheme,
  List,
  Divider,
  Searchbar,
  FAB,
} from 'react-native-paper';
import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// ###
import { LoadingIndicator } from '../../components/LoadingIndicator';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';
import { useDebounce } from '../../utils';

const StockCheckListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const safeArea = useSafeArea();
  const { colors } = useTheme();

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const checkList = useSelector(selectors.makeSelectCheckList());

  const {
    params: { shopId, shopName },
  } = route;

  React.useEffect(() => {
    if (shopId) {
      dispatch(actions.fetchCheckList({ shopId }));
    }
  }, [shopId, dispatch]);

  const onBackPress = React.useCallback(() => {
    return true;
  }, []);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [onBackPress]);

  const [openFAB, setOpenFAB] = React.useState(false);
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
      title={item.checklist_type}
      onPress={() =>
        navigation.navigate('CheckListItemsScreen', {
          clId: item.id,
          shopId,
          clType: item.checklist_type,
          shopName,
        })
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

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={'Check list'} subtitle="" />
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
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={checkList}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            keyExtractor={keyExtractor}
            contentContainerStyle={{
              backgroundColor: colors.background,
              paddingBottom: safeArea.bottom,
            }}
          />
        )}
      </View>

      <FAB.Group
        style={[styles.fab]}
        icon={openFAB ? 'close' : 'format-list-bulleted-type'}
        onPress={() => {}}
        onStateChange={({ open }) => setOpenFAB(open)}
        open={openFAB}
        actions={[
          {
            icon: 'camera',
            label: 'Chụp hình',
            onPress: () => {
              navigation.navigate('ShopCaptureScreen', { shopId, shopName });
            },
          },
        ]}
        visible={true}
      />
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

export default memo(StockCheckListScreen);
