import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCh7Gx3SxrLSoCsHLMkiHKNN7xZYfFJsz0",
    authDomain: "keycypher-5c760.firebaseapp.com",
    projectId: "keycypher-5c760",
    storageBucket: "keycypher-5c760.appspot.com",
    messagingSenderId: "1018755860487",
    appId: "1:1018755860487:web:be3e5818aad26338d502a2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export { storage };

