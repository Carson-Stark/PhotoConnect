import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, TextInput } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Friends from './Friends';

const Profile = () => {

    const navigation = useNavigation();

    return (

        <View style={styles.container}>

            <Pressable style={styles.button} onPress={() => navigation.navigate('Friends')}>
                <Text style={{ color: 'white', padding: 10 }}>Friends</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
                <Text style={{ color: 'white', padding: 10 }}>Log Out</Text>
            </Pressable>

        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        marginVertical: 4,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        borderColor: '#fff',
    }
});