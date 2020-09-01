import React from 'react';

import {
  View,
  StyleSheet,
  NativeModules,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  IconButton,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';

import { objectId } from '../../utils/uniqId';

const ImagePicker = NativeModules.ImageCropPicker;

const CustomImagePicker = ({
  setValue,
  isSubmitting,
  register,
  clearError,
  rules,
  name,
  error,
}) => {
  let actionSheet = React.useRef({});
  let [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    register({ name: name }, rules);
    setValue(name, photos);
  }, [register, rules, name, setValue, photos]);

  const onTakePhoto = () => {
    setIsLoading(true);
    ImagePicker.openCamera({
      cropping: false,
      includeExif: true,
      mediaType: 'photo',
    }).then((image) => {
      if (image) {
        photos = [...photos, { ...image, localIdentifier: objectId() }];
        if (photos.length <= 10) {
          onTakePhoto();
          setIsLoading(false);
          setPhotos(photos);
          setValue('photos', photos);
          clearError('photos');
        } else {
          setVisible(true);
          setIsLoading(false);
        }
      }
    });
  };

  const onChooseAlbum = () => {
    setIsLoading(true);
    ImagePicker.openPicker({
      cropping: false,
      includeExif: true,
      mediaType: 'photo',
      multiple: true,
      maxFiles: 10,
    }).then((image) => {
      if (image) {
        photos = [...photos, { ...image, localIdentifier: objectId() }];
        if (photos.length <= 10) {
          setPhotos(photos);
          setIsLoading(false);
          setPhotos(photos);
          setValue('photos', photos);
          clearError('photos');
        } else {
          setVisible(true);
          setIsLoading(false);
        }
      }
    });
  };

  const onRemovePhoto = React.useCallback(
    (photo) => {
      setIsDeleting(true);
      ImagePicker.cleanSingle(photo.path)
        .then(() => {
          setIsDeleting(false);
          const newPhotos = photos.filter(
            (item) => item.localIdentifier !== photo.localIdentifier,
          );
          setPhotos(newPhotos);
          setValue('photos', newPhotos);
          clearError('photos');
        })
        .catch((e) => {
          setIsDeleting(false);
          alert(e);
        });
    },
    [photos, setPhotos, setValue, clearError],
  );

  const hideDialog = () => {
    setVisible(false);
  };

  const showActionSheet = () => {
    actionSheet.show();
  };

  const onChoose = (i) => {
    if (i === 0) {
      onTakePhoto();
    }

    if (i === 1) {
      onChooseAlbum();
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.itemBox}>
        <IconButton
          icon="camera"
          size={30}
          onPress={showActionSheet}
          disabled={isLoading || isDeleting}
        />
        {error ? (
          <Paragraph style={{ color: 'red', textAlign: 'center' }}>
            Cần chọn hình ảnh
          </Paragraph>
        ) : null}
      </View>
      <ScrollView containerStyle={styles.content} horizontal>
        {photos.map((photo) => {
          return (
            <View style={styles.itemBox} key={photo.localIdentifier}>
              <View style={[styles.item]}>
                <Image source={{ uri: photo.path }} style={[styles.img]} />
              </View>
              <TouchableOpacity
                style={[styles.btnDelete]}
                onPress={() => onRemovePhoto(photo)}
                disabled={isSubmitting}>
                <Text>Xoá</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>
              {'If you want to choose more images, please do it once more time'}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ActionSheet
        ref={(o) => (actionSheet = o)}
        options={['Camera', 'Choose from Album', 'Cancel']}
        cancelButtonIndex={2}
        onPress={(index) => onChoose(index)}
        styles={{ messageBox: { height: 60 } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  content: {
    // flexDirection: 'row',
    // flexGrow: 1,
    // flexWrap: 'wrap',
    // padding: 4,
  },

  itemBox: {
    alignItems: 'center',
  },
  btnDelete: {
    height: 40,
    paddingTop: 20,
    marginBottom: 20,
    width: 150,
    alignItems: 'center',
  },
  item: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'transparent',
    marginRight: 12,

    // height: Dimensions.get('window').width / 2,
    height: 150,
    width: 150,
  },
  img: {
    // width: 88,
    // height: 88,
    borderRadius: 5,
    resizeMode: 'cover',
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#38f',
  },
});

export default React.memo(CustomImagePicker);
