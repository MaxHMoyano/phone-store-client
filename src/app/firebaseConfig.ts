import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyA9AaR6CUuvREG_QrajjPmCj6U0ZT2UdIU',
  authDomain: 'coolcovers-15ea7.firebaseapp.com',
  databaseURL: 'https://coolcovers-15ea7.firebaseio.com',
  projectId: 'coolcovers-15ea7',
  storageBucket: 'coolcovers-15ea7.appspot.com',
  messagingSenderId: '175454437855',
  appId: '1:175454437855:web:cad4a8c2e31659a388c46a',
};

// Firebase is being initialized
let fb = firebase.initializeApp(firebaseConfig);
// Firestore is also working
let firestore = firebase.firestore();

// But when I tried to initiate functions it is failing
let functions = firebase.functions();
