import React, { memo } from 'react';
import {
  Appbar,
  FAB,
  Title,
  IconButton,
  Card,
  Caption,
  Snackbar,
} from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';

import { defaultTheme } from '../../theme';
import * as selectors from './selectors';
import * as actions from './actions';

const CheckProblemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {
    params: { clId, itemId, clType },
  } = route;

  const template = useSelector(selectors.makeSelectTemplate(clId));
  const item = useSelector(selectors.makeSelectStockById(itemId));
  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const isSubmitted = useSelector(selectors.makeSelectIsSubmitted());
  const errorMessage = useSelector(selectors.makeSelectErrorMessage());
  const [showSnack, setShowSnack] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) {
      if (isSubmitted) {
        dispatch(actions.resetProps());
      } else {
        if (errorMessage && errorMessage.length) {
          setShowSnack(true);
        }
      }
    }
  }, [dispatch, isLoading, isSubmitted, navigation, errorMessage]);

  const removeError = (recordId) => {
    dispatch(actions.remove({ itemId, recordId }));
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Danh sách lỗi'} />
      </Appbar.Header>
      <ScrollView>
        {item &&
          item.data &&
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
                    clType,
                    stockName: item.stock_name,
                    role: item.role,
                    record: data,
                    recordId: i,
                  });
                }}>
                <Card.Content>
                  <View style={styles.cardRow}>
                    <Title>{data[Object.keys(template)[0]]}</Title>
                    <IconButton
                      icon="close"
                      size={20}
                      onPress={() => removeError(i)}
                    />
                  </View>
                  <View style={styles.cardRow}>
                    <Caption style={styles.col}>
                      {Object.keys(template)[3]}:{' '}
                      {data[Object.keys(template)[3]]}
                    </Caption>
                    {item.role === 'ic' && (
                      <Caption style={styles.col}>
                        {Object.keys(template)[4]}:{' '}
                        {data[Object.keys(template)[4]]}
                      </Caption>
                    )}
                  </View>
                  <View style={styles.cardRow}>
                    <Caption style={styles.col}>
                      {Object.keys(template)[1]}:{' '}
                      {data[Object.keys(template)[1]] &&
                        moment(data[Object.keys(template)[1]]).format(
                          'DD/MM/YYYY',
                        )}
                    </Caption>
                    <Caption style={styles.col}>
                      {Object.keys(template)[2]}:{' '}
                      {data[Object.keys(template)[2]] &&
                        moment(data[Object.keys(template)[2]]).format(
                          'DD/MM/YYYY',
                        )}
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
            clType,
            stockName: item.stock_name,
            role: item.role,
          });
        }}
      />
      <Snackbar
        visible={showSnack}
        onDismiss={() => setShowSnack(false)}
        duration={4000}>
        Xoá không thành công
      </Snackbar>
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
  col: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default memo(CheckProblemScreen);
