import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Vault from './components/Vault.vue'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  { path: "/", component: () => import("./components/Signin.vue") },
  { path: "/register", component: () => import("./components/Register.vue") },
  { path: "/vault", component: Vault, meta: { requiresAuth: true } },
  { path: "/generator", component: () => import("./components/Generator.vue"), meta: { requiresAuth:true } },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you dont have access!");
      next("/sign-in");
    }
  } else {
    next();
  }
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