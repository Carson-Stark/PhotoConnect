// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7N-Kap-4z69m1jL2S8VZjljuIFrYbYGo",
  authDomain: "photoconnect-e4689.firebaseapp.com",
  projectId: "photoconnect-e4689",
  storageBucket: "photoconnect-e4689.appspot.com",
  messagingSenderId: "81053835863",
  appId: "1:81053835863:web:bc9e66c2811a8acd0d7912"
};



// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// Initialize Cloud Firestore and get a reference to the service
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
