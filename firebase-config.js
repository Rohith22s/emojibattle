// Firebase Configuration
// REPLACE MEASUREMENT ID AND API KEY WITH YOUR OWN FROM FIREBASE CONSOLE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADpuzVBseNPiu1N0TxdNL28MFObMBoEyE",
    authDomain: "emoji-4d698.firebaseapp.com",
    projectId: "emoji-4d698",
    storageBucket: "emoji-4d698.firebasestorage.app",
    messagingSenderId: "701764915847",
    appId: "1:701764915847:web:90ef0e6a02145867999e22",
    measurementId: "G-3K4GCKXVFB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
