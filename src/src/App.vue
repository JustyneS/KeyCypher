<template>
    <div id="app">
        <Header />
        <SideNav :isLoggedIn="isLoggedIn" :auth="auth"/>
        <router-view />
        
        
      <!-- Other components go here -->
    </div>
  </template>
  
<script >
import SideNav from './components/SideNav.vue';
import Header from './components/Header.vue';
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const menuOpen = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};

  
export default {
  name: 'App',
  components: {
    Header,
    SideNav,
  },
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        router.push("/sign-in");
      });
    };

    return {
      isLoggedIn,
      auth,
      handleSignOut
    };
  }
};
  </script>
  
  <script setup>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const accountName = ref('');
const username = ref('');
const password = ref('');
const url = ref('');

const firestore = getFirestore();

const handleSubmit = async () => {
  try {
    const docRef = await addDoc(collection(firestore, 'accounts'), {
      accountName: accountName.value,
      username: username.value,
      password: password.value,
      url: url.value,
    });
    console.log('Document written with ID: ', docRef.id);
 
    accountName.value = '';
    username.value = '';
    password.value = '';
    url.value = '';
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
</script>
  <style>
  /* Global styles */
  body {
    background-color: #D9D9D9;
  }

  </style>
  