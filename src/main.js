import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Vault from './components/Vault.vue'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const routes = [
  {path: '/', component: Vault}, //this to be changed when first component is created (login page)
  {path: '/vault', component: Vault},
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const firebaseConfig = {
    apiKey: "AIzaSyCh7Gx3SxrLSoCsHLMkiHKNN7xZYfFJsz0",
    authDomain: "keycypher-5c760.firebaseapp.com",
    projectId: "keycypher-5c760",
    storageBucket: "keycypher-5c760.appspot.com",
    messagingSenderId: "1018755860487",
    appId: "1:1018755860487:web:be3e5818aad26338d502a2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .mount('#app');
