import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  IconButton,
  Colors,
  Card,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const TakePhoto = props => {
  const { setValue, isSubmitting, register, triggerValidation } = props;
  const [photo, setPhoto] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    register({ name: 'photo' }, { required: true });
  }, [register]);

  const onTakePhoto = React.useCallback(() => {
    setIsLoading(true);
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setIsLoading(false);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setIsLoading(false);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setIsLoading(false);
        setPhoto(source);
        setValue('photo', source.uri);
        triggerValidation('photo');
      }
    });
  }, [setValue, triggerValidation]);

  const onRemovePhoto = React.useCallback(() => {
    setPhoto(null);
    setValue('photo', null);
    triggerValidation('photo');
  }, [setValue, triggerValidation]);

  return (
    <>
      <View style={styles.row}>
        {isLoading ? (
          <ActivityIndicator animating={true} />
        ) : photo && photo.uri ? null : (
          <IconButton
            icon="camera"
            size={30}
            onPress={onTakePhoto}
            disabled={isLoading}
          />
        )}
      </View>
      <View styles={styles.content}>
        {photo && photo.uri ? (
          <Card>
            <Card.Cover
              source={{
                uri: photo.uri,
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

export default React.memo(TakePhoto);
