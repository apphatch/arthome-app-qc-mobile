import React, { memo } from 'react';
import {
  Appbar,
  Avatar,
  List,
  Colors,
  Divider,
  useTheme,
} from 'react-native-paper';
import { TouchableOpacity, View, FlatList, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// ###
import * as actions from './actions';
import * as selectors from './selectors';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { selectors as loginSelectors } from '../LoginScreen';
import { selectors as checkInSelectors } from '../CheckInScreen';

const ShopScreen = ({ navigation, route }) => {
  const safeArea = useSafeArea();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const shops = useSelector(selectors.makeSelectShops());
  const userId = useSelector(loginSelectors.makeSelectUserId());
  const isCheckIn = useSelector(checkInSelectors.makeSelectIsCheckIn());
  const checkInData = useSelector(checkInSelectors.makeSelectCheckInData());

  React.useEffect(() => {
    dispatch(actions.fetchShops({ userId }));
  }, [dispatch, userId]);

  React.useEffect(() => {
    if (isCheckIn) {
      const { shopId } = checkInData;
      navigation.navigate('StockCheckListScreen', { shopId });
    }
  }, [checkInData, isCheckIn, navigation]);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.full_address}
      onPress={() => navigation.navigate('CheckInScreen', { shopId: item.id })}
    />
  );

  const keyExtractor = item => item.id.toString();

  return (
    <>
      <Appbar.Header>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Avatar.Icon size={40} icon="menu" />
        </TouchableOpacity>
        <Appbar.Content title="Danh sách cửa hàng" subtitle="" />
      </Appbar.Header>
      <View style={[styles.container]}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
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
  caption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchbar: {
    margin: 4,
  },
});

export default memo(ShopScreen);
