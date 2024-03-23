import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';



const AddImage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Adding Images Screen!</Text>
            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', padding: 10 }}>Back</Text>
            </Pressable>
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