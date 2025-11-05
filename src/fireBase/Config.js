import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCAUXi3cuAreQc8IV_UTec4nRnR3aV9CHs",
  authDomain: "proyecto-rn-b60a9.firebaseapp.com",
  projectId: "proyecto-rn-b60a9",
  storageBucket: "proyecto-rn-b60a9.firebasestorage.app",
  messagingSenderId: "356593973011",
  appId: "1:356593973011:web:0b48ddb443955a54a28ce6"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();