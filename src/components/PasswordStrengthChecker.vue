<template>
    <div class="password-strength-checker">
      <h1>Password Strength Checker</h1>
      <div v-for="(account, index) in accounts" :key="index">
        <h2>{{ account.name }}</h2>
        <p>Website: {{ account.name }}</p>
        <p>Password: {{ account.password }}</p>
        <p>Password Strength: {{ getPasswordStrength(account.password) }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/database';
  import zxcvbn from 'zxcvbn';
  
  const accounts = ref([]);
  
  onMounted(() => {
    const database = firebase.database();
    const accountsRef = database.ref('accounts');
  
    accountsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      accounts.value = [];
      for (let id in data) {
        accounts.value.push({ id, ...data[id] });
      }
    });
  });
  
  const getPasswordStrength = (password) => {
    if (typeof password !== 'string') {
      console.log('Invalid password type:', typeof password);
      return 'Invalid password';
    }
    console.log('Password:', password);
    const result = zxcvbn(password);
    switch (result.score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Unknown";
    }
  };
  </script>
  
  <style scoped>
  .password-strength-checker {
    margin-top: 200px;
    margin-left: 400px;
  }
  </style>
  
  