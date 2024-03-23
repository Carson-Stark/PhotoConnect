import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Pressable, PermissionsAndroid } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import userId from '../../App'

import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage"
import { v4 } from "uuid"
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const AddImage = () => {
    const navigation = useNavigation();

    const [image, setImage] = useState(null);

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        requestCameraPermission();
        
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImage(imageUri);
            }
        });
    }

        {/*useEffect(()=>{
        listAll(ref(FIREBASE_STORAGE, "files")).then(imgs=>{
            console.log(imgs),
            imgs.items.forEach(val => {
                    getDownloadURL(val).then(url=>{
                        setImageURL(data=>[...data, url])
                    })
            });
        })
    }, [])*/}

    //console.log(imageURL, "imageURL");

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Adding Images Screen!</Text>
            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', padding: 10 }}>Back</Text>
            </Pressable>
            <Button title="Upload" onPress={openImagePicker} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 4,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AddImage;