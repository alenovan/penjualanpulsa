import * as firebase from 'firebase';
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyD-tf6SPQHHVYWcTwm0_pBIbfxknMo7LpM",
    authDomain: "uasreact-52e12.firebaseapp.com",
    databaseURL: "https://uasreact-52e12.firebaseio.com",
    projectId: "uasreact-52e12",
    storageBucket: "uasreact-52e12.appspot.com",
    messagingSenderId: "860863067470",
    appId: "1:860863067470:web:264c7426763442f2801a1f",
    measurementId: "G-2YZ5Y2V2JM"
});

export default app;