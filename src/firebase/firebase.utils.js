import firebase from 'firebase/app';
import 'firebase/firestore'; // Database from Firebase
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBgdAHjWPLs7nVsHMUwT11bvm-X8GqamSU",
  authDomain: "feel-good-clothing-db.firebaseapp.com",
  databaseURL: "https://feel-good-clothing-db.firebaseio.com",
  projectId: "feel-good-clothing-db",
  storageBucket: "feel-good-clothing-db.appspot.com",
  messagingSenderId: "928489595001",
  appId: "1:928489595001:web:8deee8ef3e0a208e73f4a8",
  measurementId: "G-C35JYBCWWF"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Configuring the auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; // Incase we want to take everything from Friebase