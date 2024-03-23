import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
// import Home from './Home';
import userId from '../../App'
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';
// import firebase from 'firebase/compat/app';

import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage"
import { v4 } from "uuid"
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const AddImage = () => {
    const navigation = useNavigation();

    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState([]);

    // const handleChange = (e)=>{
    //     if(e.target.files[0]){
    //         setImage(e.target.files[0])
    //     }
    // }

    const handleUpload = ()=>{
        console.log(userId);
        const imgRef = ref(FIREBASE_STORAGE, `files/${userId}/${v4()}`)
        uploadBytes(imgRef, image)
        // const uploadTask = ref(`images/test`).put(image);
        // uploadTask.on(
        //     "state changed",
        //     () => {
        //         FIREBASE_STORAGE
        //             .ref("images")
        //             .child()
        //             .getDownloadURL()
        //             .then(url => {
        //                 FIREBASE_DB.collection("posts").add({
        //                     imageURL: url
        //                 })
        //             })
        //     }
        // )
        // // setcaption();
        // setImage(null);
    }

    useEffect(()=>{
        listAll(ref(FIREBASE_STORAGE, "files")).then(imgs=>{
            console.log(imgs),
            imgs.items.forEach(val => {
                    getDownloadURL(val).then(url=>{
                        setImageURL(data=>[...data, url])
                    })
            });
        })
    }, [])

    console.log(imageURL, "imageURL");

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Adding Images Screen!</Text>
            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', padding: 10 }}>Back</Text>
            </Pressable>
            {/* <h2>Add New Post </h2>
            <input type='file' onChange={()=>{handleChange}}/>
            <Button onClick={handleUpload}>
                ADD POST
            </Button> */}
            <input type='file' onChange={(e)=>{ setImage(e.target.files[0])}}/>
            <button onClick={handleUpload}>Upload</button>

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