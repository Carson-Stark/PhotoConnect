import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, TextInput, Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import ref from '@firebase/database';


const Friends = () => {
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const addToFriends = () => {
        // Get reference to the user's friend list in Firebase
        const userFriendListRef = ref(FIREBASE_DB, 'users/${userId}/friends');

        // Check if the friend is already in the user's friend list
        userFriendListRef.child(email).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    Alert.alert('Friend already added!');
                } else {
                    // Add the friend to the user's friend list
                    userFriendListRef.child(email).set(true)
                        .then(() => {
                            Alert.alert('Friend added successfully!');
                        })
                        .catch(error => {
                            console.error('Error adding friend:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error checking friend existence:', error);
            });
    };

    return (
        <View style={styles.container}>

            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
            <Pressable style={styles.button} onPress={() => (addToFriends())}>
                <Text style={{ color: 'white', padding: 10 }}>Add Friend</Text>
            </Pressable>
        </View>
    );
};


// Function to add a friend to a list in Firestore if it doesn't already exist
/*async function addFriendIfNotExists(friendId) {
    const userd = userId;
    const friendsCollectionRef = firebase.firestore().collection('users').

    try {
        // Check if the friend already exists in the list
        const existingFriendQuery = await friendsCollectionRef.where('friendId', '==', friendId).get();

        if (existingFriendQuery.empty) {
            // Friend does not exist, so add them to the list
            await friendsCollectionRef.add({ friendId: friendId });
            console.log("Friend added successfully.");
        } else {
            console.log("Friend already exists in the list.");
        }
    } catch (error) {
        console.error("Error adding friend to list:", error);
        throw error; // Propagate the error
    }
}*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
     button: {
        marginVertical: 4,
        backgroundColor: 'black',
        justifyContent: 'center',
         alignItems: 'center',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        marginVertical: 4,
        marginHorizontal: 20,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        borderColor: 'black',
    }
});

export default Friends;