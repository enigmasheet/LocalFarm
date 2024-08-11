// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz5NHj_nFh4IGq-R6xAVGL33wE9ONsfa8",
  authDomain: "localfarm-53a16.firebaseapp.com",
  databaseURL: "https://localfarm-53a16-default-rtdb.firebaseio.com",
  projectId: "localfarm-53a16",
  storageBucket: "localfarm-53a16.appspot.com",
  messagingSenderId: "530559790244",
  appId: "1:530559790244:web:7924b190af34fc82cc4a31",
  measurementId: "G-YHY7Z4QV7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth
const database = getDatabase(app); // Initialize Realtime Database

export { auth, database };
