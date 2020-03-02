import React, { memo } from 'react';
import {
  Appbar,
  Divider,
  useTheme,
  Caption,
  FAB,
  Switch,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import { View, StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

// ###

import { defaultTheme } from '../../theme';
import { BUG_LIST } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

const StockCheckListScreen = ({ navigation, route }) => {
  const safeArea = useSafeArea();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.makeSelectIsLoading());

  const {
    params: {
      stock: { title, id: stockId },
      shopId,
    },
  } = route;

  const renderItem = ({
    item,
    values,
    setFieldValue,
    handleBlur,
    handleChange,
  }) => (
    <View style={styles.row}>
      {item.type === 1 ? (
        <>
          <Paragraph>{item.label}</Paragraph>
          <Switch
            value={values[item.name]}
            onValueChange={val => setFieldValue(item.name, val)}
            color={colors.primary}
          />
        </>
      ) : (
        <TextInput
          label={item.label}
          value={values[item.name]}
          onChangeText={handleChange(item.name)}
          onBlur={handleBlur(item.name)}
          style={styles.textInput}
        />
      )}
    </View>
  );
  const keyExtractor = item => item.id;

  const onSubmitCheckList = React.useCallback(
    values => {
      console.log('StockCheckListScreen -> values', values);
      dispatch(actions.submit({ shopId, stockId, data: values }));
    },
    [dispatch, shopId, stockId],
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} subtitle="" />
      </Appbar.Header>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Formik
          // initialValues={initialValues}
          onSubmit={onSubmitCheckList}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <>
              <Caption style={styles.caption}>Danh sách lỗi</Caption>
              <FlatList
                data={BUG_LIST}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    values,
                    setFieldValue,
                    handleChange,
                    handleBlur,
                  })
                }
                ItemSeparatorComponent={Divider}
                keyExtractor={keyExtractor}
                contentContainerStyle={{
                  backgroundColor: colors.background,
                  paddingBottom: safeArea.bottom + 56,
                }}
              />

              <FAB
                style={[styles.fab, { backgroundColor: colors.primary }]}
                icon="check-all"
                onPress={handleSubmit}
                label="Gửi"
                disabled={isLoading}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
  },
});

export default memo(StockCheckListScreen);
