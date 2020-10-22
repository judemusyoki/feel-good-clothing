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

// Take user object and store it in our own database
// It's async because it's an api call

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;  // Check if the user has logged in, meaning the object exists or not

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();


  // Is there a snapshot? user in our datbase?
  // if not create a new user using the object from user auth
  if(!snapShot.exists) {  
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Asynchronous call to save to database
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef; // We might stillneed the user ref for other things
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Configuring the auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; // Incase we want to take everything from Friebase