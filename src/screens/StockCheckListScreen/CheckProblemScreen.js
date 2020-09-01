import React, { memo } from 'react';
import {
  Appbar,
  FAB,
  Title,
  IconButton,
  Card,
  Caption,
} from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';

import { useSelector } from 'react-redux';

import { defaultTheme } from '../../theme';
import * as selectors from './selectors';

const CheckProblemScreen = ({ navigation, route }) => {
  const {
    params: { clId, itemId, shopId, clType },
  } = route;

  const template = useSelector(selectors.makeSelectTemplate(clId));
  const item = useSelector(selectors.makeSelectStockById(itemId));
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Danh sách lỗi'} subtitle="" />
      </Appbar.Header>
      <ScrollView>
        {item.data &&
          item.data.records &&
          item.data.records.length > 0 &&
          item.data.records.map((data, i) => {
            return (
              <Card
                key={i}
                style={styles.card}
                onPress={() => {
                  navigation.navigate('FormScreen', {
                    itemId: item.id,
                    clId,
                    shopId,
                    clType,
                    stockName: item.stock_name,
                    category: item.category,
                    record: data,
                  });
                }}>
                <Card.Content>
                  <View style={styles.cardRow}>
                    <Title>{data[Object.keys(template)[0]]}</Title>
                    <IconButton
                      icon="close"
                      size={20}
                      onPress={() => {
                        console.log('remove');
                      }}
                    />
                  </View>
                  <View style={styles.cardRow}>
                    <Caption>
                      {Object.keys(template)[4]}:{' '}
                      {data[Object.keys(template)[4]]}
                    </Caption>
                    <Caption>
                      {Object.keys(template)[3]}:{' '}
                      {data[Object.keys(template)[3]]}
                    </Caption>
                  </View>
                  <View style={styles.cardRow}>
                    <Caption>
                      {Object.keys(template)[1]}:{' '}
                      {data[Object.keys(template)[1]]}
                    </Caption>
                    <Caption>
                      {Object.keys(template)[2]}:{' '}
                      {data[Object.keys(template)[2]]}
                    </Caption>
                  </View>
                </Card.Content>
              </Card>
            );
          })}
      </ScrollView>
      <FAB
        visible={true}
        style={[styles.fab]}
        icon="database-plus"
        onPress={() => {
          navigation.navigate('FormScreen', {
            itemId: item.id,
            clId,
            shopId,
            clType,
            stockName: item.stock_name,
            category: item.category,
          });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
  },
  caption: {
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 16,
  },
  form: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: defaultTheme.colors.background,
  },
  card: {
    margin: 15,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});

export default memo(CheckProblemScreen);
