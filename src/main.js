import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Vault from './components/Vault.vue'; 

const routes = [
  {path: '/vault', component: Vault},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
const firebaseConfig = {
  apiKey: "AIzaSyDog4gaGVAAiONeTzwUIkqt3jbC5sSs4IA",
  authDomain: "yoobeedata.firebaseapp.com",
  databaseURL: "https://yoobeedata-default-rtdb.firebaseio.com/",
  projectId: "yoobeedata",
  storageBucket: "yoobeedata.appspot.com",
  messagingSenderId: "292216842527",
  appId: "1:292216842527:web:056b6f958d206ffb97e82a",
  measurementId: "G-ZL7008M71Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .mount('#app');