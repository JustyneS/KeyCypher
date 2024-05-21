<template>
  <div id="app">
    <Header />
    <SideNav :isLoggedIn="isLoggedIn" />
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

import Header from './components/Header.vue';
import SideNav from './components/SideNav.vue';

const isLoggedIn = ref(false);
const auth = getAuth();
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};

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

    // Reset form fields after submission
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
