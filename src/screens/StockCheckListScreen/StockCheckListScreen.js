import React, { memo } from 'react';
import {
  Appbar,
  Divider,
  useTheme,
  Caption,
  FAB,
  Switch,
  Paragraph,
  Checkbox,
  TouchableRipple,
} from 'react-native-paper';
import { View, StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'react-native-material-dropdown-v2';

// ###
import TextInput from '../../components/TextInput';

import { defaultTheme } from '../../theme';
import * as actions from './actions';
import * as selectors from './selectors';
import { actions as checkInActions } from '../CheckInScreen';

const StockCheckListScreen = ({ navigation, route }) => {
  console.log('StockCheckListScreen -> route', route);
  const safeArea = useSafeArea();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.makeSelectIsLoading());
  const checkList = useSelector(selectors.makeSelectCheckList());
  console.log('StockCheckListScreen -> checkList', checkList);

  const { register, setValue, handleSubmit, errors, clearError } = useForm();

  const [openFAB, setOpenFAB] = React.useState(false);

  const {
    params: { shopId },
  } = route;

  React.useEffect(() => {
    if (shopId) {
      dispatch(actions.fetchCheckList({ shopId }));
    }
  }, [shopId, dispatch]);

  const onSubmitCheckList = React.useCallback(values => {
    console.log('StockCheckListScreen -> values', values);
    // dispatch(actions.submit({ shopId, stockId, data: values }));
  }, []);

  const onCheckOut = React.useCallback(() => {
    console.log('StockCheckListScreen -> onCheckOut');
    navigation.navigate('CheckOutScreen', { shopId });
  }, [navigation, shopId]);

  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
        <Appbar.Content title={'Check list'} subtitle="" />
      </Appbar.Header>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Caption style={styles.caption}>Danh sách lỗi</Caption>

        {checkList.map((item, index) => {
          const { template } = item;
          console.log('----: ', Object.keys(template));

          return Object.keys(template).map(fieldName => {
            const type = template[fieldName].type;
            if (type === 'text') {
              return (
                <TextInput
                  key={fieldName}
                  label={fieldName}
                  ref={register({ name: fieldName })}
                  onChangeText={text => setValue(fieldName, text, true)}
                />
              );
            }
            if (type === 'checkbox') {
              return (
                <TouchableRipple key={fieldName}>
                  <View>
                    <Paragraph>{fieldName}</Paragraph>
                    <View pointerEvents="none">
                      <Checkbox
                        ref={register({ name: fieldName })}
                        value="yes"
                        status={'checked'}
                      />
                    </View>
                  </View>
                </TouchableRipple>
              );
            }
            if (type === 'select') {
              return (
                <Dropdown
                  label={fieldName}
                  data={template[fieldName].values.map(val => {
                    return { value: val };
                  })}
                />
              );
            }
          });
        })}

        <FAB.Group
          style={[styles.fab]}
          icon={openFAB ? 'close' : 'format-list-bulleted-type'}
          onPress={() => {}}
          onStateChange={({ open }) => setOpenFAB(open)}
          open={openFAB}
          actions={[
            {
              icon: 'check-all',
              label: 'Gửi',
              onPress: handleSubmit(onSubmitCheckList),
            },
            {
              icon: 'account-off-outline',
              label: 'Check out',
              onPress: onCheckOut,
            },
          ]}
          visible={true}
        />
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
