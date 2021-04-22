import React from 'react';
import { launchCamera } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Marker, { Position } from 'react-native-image-marker';
import moment from 'moment-timezone';

import { View, StyleSheet, Platform } from 'react-native';
import {
  IconButton,
  Colors,
  Card,
  Button,
  ActivityIndicator,
} from 'react-native-paper';

const TakePhoto = (props) => {
  const {
    setValue,
    isSubmitting,
    register,
    triggerValidation,
    rules,
    value,
    name,
  } = props;

  const [photo, setPhoto] = React.useState(value);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    register(name, rules);
    setValue(name, photo);
  }, [register, rules, setValue, photo, name]);

  const onTakePhoto = React.useCallback(() => {
    setIsLoading(true);
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: false,
      },
      (response) => {
        if (response.didCancel) {
          setIsLoading(false);
        } else if (response.error) {
          setIsLoading(false);
        } else if (response.customButton) {
        } else {
          const now = moment()
            .tz('Asia/Ho_Chi_Minh')
            .format('HH:mm:ss DD-MM-YYYY');
          const {
            uri,
            error,
            originalRotation,
            fileSize,
            width,
            height,
          } = response;
          let rotation = 0;
          let reWidth = width;
          let reHeight = height;
          let quality = 100;
          if (uri && !error) {
            if (originalRotation === 90) {
              rotation = 90;
            } else if (originalRotation === 270) {
              rotation = -90;
            }
          }
          if (fileSize >= 200000) {
            reWidth = (width * 2) / 3;
            reHeight = (height * 2) / 3;
            quality = Platform.OS === 'ios' ? 40 : 60;
          }

          ImageResizer.createResizedImage(
            uri,
            reWidth,
            reHeight,
            'JPEG',
            quality,
            rotation,
          )
            .then((res) => {
              Marker.markText({
                src: res.uri,
                color: '#FF0000',
                fontSize: 14,
                X: 30,
                Y: 30,
                scale: 1,
                quality: 100,
                text: `${now}`,
                position: Position.topLeft,
              })
                .then((path) => {
                  const source =
                    Platform.OS === 'android'
                      ? 'file://' + path
                      : 'file:///' + path;
                  console.log('source', source);
                  setIsLoading(false);
                  setPhoto(source);
                  setValue(name, source);
                  triggerValidation(name);
                })
                .catch(() => {
                  setIsLoading(false);
                });
            })
            .catch(() => {
              setIsLoading(false);
            });
        }
      },
    );
  }, [setValue, triggerValidation, name]);

  const onRemovePhoto = React.useCallback(() => {
    setPhoto(null);
    setValue(name, null);
    triggerValidation(name);
  }, [setValue, triggerValidation, name]);

  return (
    <>
      <View style={styles.row}>
        {isLoading ? (
          <ActivityIndicator animating={true} />
        ) : photo ? null : (
          <IconButton
            icon="camera"
            size={30}
            onPress={onTakePhoto}
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
