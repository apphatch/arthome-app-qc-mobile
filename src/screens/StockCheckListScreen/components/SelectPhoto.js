import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { View, StyleSheet, Dimensions } from 'react-native';
import {
  IconButton,
  Colors,
  Card,
  Button,
  ActivityIndicator,
} from 'react-native-paper';

import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import { savePicture } from '../../../utils';

const SelectPhoto = (props) => {
  const {
    setValue,
    isSubmitting,
    register,
    triggerValidation,
    rules,
    value,
    name,
    recordId,
  } = props;
  const dispatch = useDispatch();
  let actionSheetRef = React.useRef(null);
  const [photo, setPhoto] = React.useState(value);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    register(name, rules);
    setValue(name, photo);
  }, [name, photo, register, rules, setValue]);

  React.useEffect(() => {
    // if (recordId === null) {
    if (photo) {
      dispatch(actions.uploadPhoto({ photo }));
    } else {
      dispatch(actions.resetProps());
    }
    // }
  }, [recordId, photo, dispatch]);

  const onSelect = () => {
    actionSheetRef.show();
  };

  const onTakePhoto = React.useCallback(() => {
    setIsLoading(true);
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        quality: 1,
      },
      (response) => {
        console.log(response);
        if (response.uri) {
          savePicture(response.uri);
          setPhoto(response.uri);
          setIsLoading(false);
          setValue(name, response.uri);
          triggerValidation(name);
        } else {
          setIsLoading(false);
        }
      },
    );
  }, [name, setValue, triggerValidation]);

  const onChoosePhoto = React.useCallback(() => {
    setIsLoading(true);
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        quality: 1,
      },
      (response) => {
        if (response.uri) {
          setPhoto(response.uri);
          setIsLoading(false);
          setValue(name, response.uri);
          triggerValidation(name);
        } else {
          setIsLoading(false);
        }
      },
    );
  }, [name, setValue, triggerValidation]);

  const onRemovePhoto = React.useCallback(() => {
    setIsLoading(false);
    setPhoto(null);
    setValue(name, null);
    triggerValidation(name);
  }, [name, setValue, triggerValidation]);

  return (
    <>
      <View style={styles.row}>
        {isLoading ? (
          <ActivityIndicator animating={true} />
        ) : photo ? null : (
          <IconButton
            icon="camera"
            size={30}
            onPress={onSelect}
            disabled={isLoading}
          />
        )}
      </View>
      <View styles={styles.content}>
        {photo ? (
          <Card>
            <Card.Cover
              source={{
                uri: photo,
              }}
            />
            <Card.Actions>
              <Button onPress={onRemovePhoto} disabled={isSubmitting}>
                Xoá bỏ
              </Button>
            </Card.Actions>
          </Card>
        ) : null}
      </View>
      <ActionSheet
        ref={(o) => (actionSheetRef = o)}
        title={'Select'}
        options={['Camera', 'Choose from library', 'Cancel']}
        cancelButtonIndex={2}
        onPress={(index) => {
          switch (index) {
            case 0: {
              onTakePhoto();
              break;
            }
            case 1: {
              onChoosePhoto();
              break;
            }
            default:
              break;
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    backgroundColor: Colors.indigo400,
    height: 200,
    width: '100%',
    flex: 1,
  },
  photo: {
    height: 400,
    width: 300,
    flex: 1,
    resizeMode: 'cover',
  },
});

export default React.memo(SelectPhoto);
