import React from 'react';
// import ImageResizer from 'react-native-image-resizer';
// import Marker, { Position } from 'react-native-image-marker';
// import moment from 'moment-timezone';
// import ActionSheet from 'react-native-actionsheet';

import {
  View,
  StyleSheet,
  // Platform,
  NativeModules,
  Image,
  // Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { IconButton } from 'react-native-paper';

import { objectId } from '../../utils/uniqId';

// const options = {
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

const ImagePicker = NativeModules.ImageCropPicker;

const CustomImagePicker = ({ photos, setPhotos, isLoading }) => {
  const actionRef = React.useRef(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const onTakePhoto = () => {
    // actionRef.current.show();
    ImagePicker.openCamera({
      cropping: false,
      includeExif: true,
      mediaType: 'photo',
    }).then(image => {
      onTakePhoto();
      photos = [...photos, { ...image, localIdentifier: objectId() }];
      setPhotos(photos);
    });
  };

  const onRemovePhoto = React.useCallback(
    photo => {
      setIsDeleting(true);
      ImagePicker.cleanSingle(photo.path)
        .then(() => {
          console.log(`removed tmp image ${photo.path} from tmp directory`);
          setIsDeleting(false);
          const newPhotos = photos.filter(
            item => item.localIdentifier !== photo.localIdentifier,
          );
          setPhotos(newPhotos);
        })
        .catch(e => {
          setIsDeleting(false);
          alert(e);
        });
    },
    [photos, setPhotos],
  );

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <IconButton
          icon="camera"
          size={30}
          onPress={() => onTakePhoto()}
          disabled={isLoading || isDeleting}
        />
      </View>
      <ScrollView containerStyle={styles.content} horizontal>
        {photos.map(photo => {
          return (
            <View style={styles.itemBox} key={photo.localIdentifier}>
              <View style={[styles.item]}>
                <Image source={{ uri: photo.path }} style={[styles.img]} />
              </View>
              <TouchableOpacity
                style={[styles.btnDelete]}
                onPress={() => onRemovePhoto(photo)}
                disabled={isLoading || isDeleting}>
                <Text>Xoá</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* <ActionSheet
        ref={actionRef}
        title={'Chọn hình từ...'}
        options={['Camera', 'Cancel']}
        cancelButtonIndex={1}
        onPress={index => {
          // if (index === 1) {
          //   ImagePicker.openPicker({
          //     multiple: true,
          //     waitAnimationEnd: false,
          //     sortOrder: 'asc',
          //     includeExif: true,
          //     mediaType: 'photo',
          //   }).then(images => {
          //     console.log(images);
          //     setPhotos([...photos, ...images]);
          //   });
          // }
          if (index === 0) {
            // () => pickImageFromCamera()
            // ImagePicker.openCamera({
            //   cropping: false,
            //   includeExif: true,
            //   mediaType: 'photo',
            // }).then(image => {
            //   console.log(image);
            //   setPhotos([...photos, { ...image, localIdentifier: objectId() }]);
            // });
          }
        }}
      /> */}
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
});

export default React.memo(CustomImagePicker);