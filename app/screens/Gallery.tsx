import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import AddImage from '../screens/AddImage';

const imageList = [
    { id: '1', source: require('../images/test1.jpg') },
    { id: '2', source: require('../images/test2.jpg') },
    { id: '3', source: require('../images/test3.jpg') },
    { id: '4', source: require('../images/test3.jpg') },
    { id: '5', source: require('../images/add.png')}
    // Add more images as needed
];

const windowWidth = Dimensions.get('window').width;

const Gallery = () => {

    const navigation = useNavigation();

    // const handleNavigation = (screen) => {
    //     navigation.navigate(screen);
    // };

     const handleImagePress = (item) => {
        // Check if it's the last image
        if (item.id === imageList[imageList.length - 1].id) {
            // Navigate to a different screen or perform a different action for the last image

            navigation.navigate("AddImage");

            // alert('Add Image');
        } else {
            // For other images, navigate to the 'ImageDetails' screen
            
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image source={item.source} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Gallery</Text>
            <FlatList
                data={imageList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
            />
            {/* <button onClick={()=>{navigation.navigate(AddImage)}}>upload</button> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
    },
    button: {
        marginVertical: 4,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    list: {
        justifyContent: 'space-between',
    },
    image: {
        width: (windowWidth - 40) / 3, // Adjust margins and padding
        height: (windowWidth - 40) / 3, // to fit 3 images in a row
    },
});

export default Gallery;