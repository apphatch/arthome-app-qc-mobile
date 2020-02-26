import React, {memo} from 'react';
import {
  Appbar,
  Avatar,
  List,
  Colors,
  Divider,
  useTheme,
} from 'react-native-paper';
import {TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

// ###
import {data} from './data';

const ShopScreen = ({navigation}) => {
  const safeArea = useSafeArea();
  const {colors} = useTheme();

  const renderItem = ({item}) => (
    <List.Item
      title={item.title}
      description={item.description}
      onPress={() => navigation.navigate('StockScreen')}
    />
  );

  const keyExtractor = item => item.id;

  return (
    <>
      <Appbar.Header>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginLeft: 10}}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Avatar.Icon size={40} icon="menu" />
        </TouchableOpacity>
        <Appbar.Content title="Danh sách cửa hàng" subtitle="" />
      </Appbar.Header>
      <View style={[styles.container]}>
        <FlatList
          data={data}
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
