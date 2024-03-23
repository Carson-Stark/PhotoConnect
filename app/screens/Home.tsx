import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddImage from './AddImage';

// const Stack = createNativeStackNavigator();
// const InsideStack = createNativeStackNavigator();


const HomeScreen = () => {

    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Home Screen!</Text>
            <Pressable style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
                <Text style={{ color: 'white', padding: 10 }}>Log Out</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() =>
                navigation.navigate(AddImage)
            }>
                <Text style={{ color: 'white', padding: 10 }}>Add Image</Text>
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

export default HomeScreen;