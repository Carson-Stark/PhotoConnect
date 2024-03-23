import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
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
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <InsideStack.Navigator>
        <InsideStack.Screen name="Gallery" component={Home} options={{ headerShown: false }} />
        <InsideStack.Screen name="Friends" component={AddImage} options={{ headerShown: false }} />
      </InsideStack.Navigator>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
        <Pressable style={styles.button} onPress={() => { navigation.navigate('Gallery') }}>
          <Text  style={{ color: 'white', padding: 10 }}>Gallery</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => { navigation.navigate('Friends') }}>
          <Text  style={{ color: 'white', padding: 10 }}>Friends</Text>
        </Pressable>
      </View>
    </View>
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
  button: {
        marginVertical: 4,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});