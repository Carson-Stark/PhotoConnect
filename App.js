import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import AddImage from './app/screens/AddImage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <InsideStack.Screen name="AddImage" component={AddImage} options={{ headerShown: false }} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
            <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}} />
          ) : (
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
