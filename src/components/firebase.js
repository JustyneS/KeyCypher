import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDog4gaGVAAiONeTzwUIkqt3jbC5sSs4IA",
  authDomain: "yoobeedata.firebaseapp.com",
  databaseURL: "https://yoobeedata-default-rtdb.firebaseio.com",
  projectId: "yoobeedata",
  storageBucket: "yoobeedata.appspot.com",
  messagingSenderId: "292216842527",
  appId: "1:292216842527:web:056b6f958d206ffb97e82a",
  measurementId: "G-ZL7008M71Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export { storage };
