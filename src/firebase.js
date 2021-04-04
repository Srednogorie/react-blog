// src/firebase.js
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKmVu-h_FYNWsTVXF325Tfp-BfpNDX4s8",
    authDomain: "mysoftexam.firebaseapp.com",
    databaseURL: "https://mysoftexam.firebaseio.com",
    projectId: "mysoftexam",
    storageBucket: "mysoftexam.appspot.com",
    messagingSenderId: "954863064040",
    appId: "1:954863064040:web:14144eeef8e0f1c563ca5d",
    measurementId: "G-318GKHWSBB"
};
firebase.initializeApp(firebaseConfig);
export default firebase;
