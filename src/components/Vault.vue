<template>
  <div class="vault">
    <button class="add-account-button" @click="showForm = true" title="Add Account"><i class="fa-solid fa-plus"></i></button>
    <form v-show="showForm">
      <input v-model="newAccount.name" placeholder="URL/Account">
      <input v-model="newAccount.email" placeholder="Username/Email">
      <input v-model="newAccount.password" placeholder="Password">
      <button @click.prevent="addAccount">Save</button> <!-- Modification here -->
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export default {
  name: 'Vault',
  data() {
    return {
      showForm: false,
      newAccount: { name: '', email: '', password: '' },
      accounts: [], 
    };
  },
  methods: {
    addAccount() {
      console.log("Attempting to add account: ", this.newAccount); //debug
      firebase.database().ref('accounts/' + this.newAccount.name).set(this.newAccount)
        .then(() => {
          console.log("Account added successfully: ", this.newAccount); //debug
          this.accounts.push({ ...this.newAccount, showPassword: false });
          this.newAccount = { name: '', email: '', password: '' };
          this.showForm = false;
        })
        .catch(error => console.error('Error adding account: ', error));
    },
  },
};
</script>

<style scoped>
.vault {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust as needed */
  position: relative; /* Added for positioning the button */
}

.vault form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* Adjust as needed */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Adjust as needed */
  width: 300px; /* Adjust as needed */
  gap: 10px; /* Adjust as needed */
}

.vault form input {
  margin-bottom: 10px; /* Adjust as needed */
}

.vault .add-account-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
