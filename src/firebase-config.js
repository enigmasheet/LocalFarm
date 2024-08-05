// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAz5NHj_nFh4IGq-R6xAVGL33wE9ONsfa8',
  authDomain: 'localfarm-53a16.firebaseapp.com',
  projectId: 'localfarm-53a16',
  storageBucket: 'localfarm-53a16.appspot.com',
  messagingSenderId: '530559790244',
  appId: '1:530559790244:web:7924b190af34fc82cc4a31',
  measurementId: 'G-YHY7Z4QV7J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Initialize Firestore

export { auth, db };
