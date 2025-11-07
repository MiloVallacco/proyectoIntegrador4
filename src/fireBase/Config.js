import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBIvPbGw_35NCD8yUqaO_W_ZCLyLLeTSwk",
  authDomain: "proyectofinalpro3-f1879.firebaseapp.com",
  projectId: "proyectofinalpro3-f1879",
  storageBucket: "proyectofinalpro3-f1879.firebasestorage.app",
  messagingSenderId: "888761227615",
  appId: "1:888761227615:web:107d51244d4397835afeea"
};

app.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()