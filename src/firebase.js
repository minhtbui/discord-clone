import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyCkvaOT1uuceE8DWKcEmT9XkMlW3D2xNwQ',
   authDomain: 'clone-project-a3066.firebaseapp.com',
   databaseURL: 'https://clone-project-a3066.firebaseio.com',
   projectId: 'clone-project-a3066',
   storageBucket: 'clone-project-a3066.appspot.com',
   messagingSenderId: '998931709075',
   appId: '1:998931709075:web:78767f3d284e4724a9a166',
   measurementId: 'G-S73B1B9TB8',
};

// set connecting to firebase server
const firebaseApp = firebase.initializeApp(firebaseConfig);

// link to firestore cloud of firebase
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
