// Import the functions you need from the SDKs you need

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrjqCLVrLmVqTF-DUGtvIMhuuZXtF-r2o",
  authDomain: "wefinder-7276a.firebaseapp.com",
  projectId: "wefinder-7276a",
  storageBucket: "wefinder-7276a.appspot.com",
  messagingSenderId: "331599924871",
  appId: "1:331599924871:web:b6c4d6c627ee6fb710b222"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider, storage};
export default db;