import firebase from 'firebase/app';
import 'firebase/firestore'; // Database from Firebase
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBgdAHjWPLs7nVsHMUwT11bvm-X8GqamSU',
  authDomain: 'feel-good-clothing-db.firebaseapp.com',
  databaseURL: 'https://feel-good-clothing-db.firebaseio.com',
  projectId: 'feel-good-clothing-db',
  storageBucket: 'feel-good-clothing-db.appspot.com',
  messagingSenderId: '928489595001',
  appId: '1:928489595001:web:8deee8ef3e0a208e73f4a8',
  measurementId: 'G-C35JYBCWWF'
};

// Take user object and store it in our own database
// It's async because it's an api call

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // Check if the user has logged in, meaning the object exists or not

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // Is there a snapshot? user in our datbase?
  // if not create a new user using the object from user auth
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Asynchronous call to save to database
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef; // We might still need the user ref for other things
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // Firestore only allows 1 set call at a time, so we do a batch call
  const batch = firestore.batch();
  // ForEach does not return a new Array the .map does, so we can just loop through
  objectsToAdd.forEach((obj) => {
    // Give me a new doc ref and a generate a new id for it, for each object or collection
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj); // Batch each object to the new docs created
  });

  // Now we fire our batch call
  return await batch.commit();
};

// Function to get and convert the data to an object instead of the array we get from Firestore
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase?.()), // Converts all char to something the URL can read
      id: doc.id,
      title,
      items
    };
  });
  // Pass in initial object
  // Sets first value to title in lowercase e.g. hats
  // THen next one
  // Sets second property to jackets collection
  // Finally an object with all data in the ogject form as the original SHOP_DATA and it's ready to be passed to the reducer
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase?.()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Configuring the auth
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase; // Incase we want to take everything from Friebase
