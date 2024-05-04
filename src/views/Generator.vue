<template>
  <div class="form">
  <h2>Add New Account</h2>
  <form  @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="accountName">Account Name:</label>
      <input type="text" id="accountName" v-model="accountName" @keyup.enter="handleSubmit">
    </div>
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" @keyup.enter="handleSubmit">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" @keyup.enter="handleSubmit">
    </div>
    <div class="form-group">
      <label for="url">URL:</label>
      <input type="url" id="url" v-model="url" @keyup.enter="handleSubmit">
    </div>
    <div class="button-group">
    <button type="submit" class="save-btn">Save</button>
    <button class="cancel-btn">Cancel</button>
  </div>
  </form>
</div>
    <div class="password-generator">
      <h2>Password Generator</h2>
      <div class="length-slider">
        <label>Password Length: {{ passwordLength }}</label>
        <input type="range" v-model="passwordLength" min="6" max="50">
      </div>
      <div class="options">
        <label><input type="checkbox" v-model="includeNumbers"> Include Numbers</label>
        <label><input type="checkbox" v-model="includeUppercase"> Include Uppercase</label>
        <label><input type="checkbox" v-model="includeLowercase"> Include Lowercase</label>
        <label><input type="checkbox" v-model="includeSpecialChars"> Include Special Characters</label>
      </div>
      <button class="generate-btn" @click="generatePassword">Generate Password</button>
      <div class="password-display">
        <p v-if="generatedPassword">{{ generatedPassword }}</p>
        <button v-if="generatedPassword" class="copy-btn" @click="copyPassword">Copy</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        passwordLength: 8,
        generatedPassword: '',
        includeNumbers: true,
        includeUppercase: true,
        includeLowercase: true,
        includeSpecialChars: true,
      };
    },
    methods: {
      generatePassword() {
        let charset = '';
        if (this.includeNumbers) charset += '0123456789';
        if (this.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (this.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (this.includeSpecialChars) charset += '!@#$%^&*()_+?><:{}[]';
  
        let password = '';
        for (let i = 0; i < this.passwordLength; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }
        this.generatedPassword = password;
      },
      copyPassword() {
        const el = document.createElement('textarea');
        el.value = this.generatedPassword;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Password copied to clipboard!');
      }
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

  
  <style scoped>
  .form {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 200px;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #a4cecc;
}

.form h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group input[type="url"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  
}

.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus,
.form-group input[type="url"]:focus {
  outline: none;
  border-color: #007bff;
}


.form-group input[type="submit"]:hover {
  background-color: #0056b3;
}

.button-group {
  display: flex;
  justify-content:center;
}

.save-btn,
.cancel-btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;
}

.save-btn {
  background-color: #28a745;
  color: #fff;
}

.cancel-btn {
  background-color: #dc3545;
  color: #fff;
}

.save-btn:hover,
.cancel-btn:hover {
  opacity: 0.8;
}

 .password-generator {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #a4cecc;
   
}

/* Adjustments for smaller screens */
@media only screen and (max-width: 500px) {
  .password-generator {
    width: 90%; /* Adjust the width for smaller screens */
    margin-top: 100px; /* Adjust the top margin */
  }
}

.length-slider {
  margin-bottom: 20px;
}

.options {
  margin-bottom: 20px;
}

.options label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.options label input[type="checkbox"] {
  margin-right: 8px;
}

.generate-btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.generate-btn:hover {
  background-color: #0056b3;
}

.password-display {
  margin-top: 20px;
}

.copy-btn {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 14px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.copy-btn:hover {
  background-color: #218838;
}
  </style>
  