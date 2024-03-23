import { View, Text, TextInput, Button, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { collection, addDoc } from "firebase/firestore"; 




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.log(e);
            alert("Sign in failed");
        }
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
                email: email.toLowerCase().trim(),
                name: "test"
              });
            
        } catch (e) {
            console.log(e);
            alert("Sign up failed");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
            <TextInput value={password} style={styles.input} placeholder="Password" autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry />

            {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (
                <>
                    <Pressable style={styles.button} onPress={() => signIn()}>
                        <Text style={{ color: 'white', padding: 10 }}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => signUp()}>
                        <Text style={{ color: 'white', padding: 10 }}>Create Account</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

export default Login;

import { StyleSheet } from 'react-native';

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
