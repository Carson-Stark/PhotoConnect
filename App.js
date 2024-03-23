import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native';
import Login from './app/screens/Login';
import Home from './app/screens/Gallery';
import Friends from './app/screens/Friends'
import Profile from './app/screens/Profile'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { Profiler, useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();


const iconList = [
  { id: '1', source: require("./app/images/gallery.png"), screen: 'Gallery' },
  { id: '2', source: require("./app/images/arrow_down.png"), screen: 'Inbox' },
  { id: '3', source: require("./app/images/arrow_up.png"), screen: 'Outbox' },
  { id: '4', source: require("./app/images/person.png"), screen: 'Profile' },
  // Add more images as needed
];


//var userId = "";

function InsideLayout() {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      <InsideStack.Navigator>
        <InsideStack.Screen name="Gallery" component={Home} options={{ headerShown: false }} />
        <InsideStack.Screen name="Friends" component={Friends} options={{ headerShown: false }} />
        <InsideStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </InsideStack.Navigator>

      <View style={styles.buttonContainer}>
        {iconList.map((icon) => (
          <Pressable key={icon.id} style={styles.icon_button} onPress={() => handleNavigation(icon.screen)}>
            <Image source={icon.source} style={styles.image} />
          </Pressable>
        ))}
      </View>
      
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      //userId = user.email;
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
  icon_button: {
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginVertical: 20
  },
});