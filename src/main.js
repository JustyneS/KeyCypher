import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from "./router"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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


initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')

