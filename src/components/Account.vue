<template>
    <div class="account-settings">
      <h2>Account Settings</h2>
      <form @submit.prevent="updateSettings">
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" />
        </div>
        <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
        <p v-if="successMsg" class="success-message">{{ successMsg }}</p>
        <div class="button-group">
          <button type="submit">Save Changes</button>
          <button type="button" @click="resetForm">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getAuth, updateEmail, updatePassword, updateProfile } from "firebase/auth";
  
  const auth = getAuth();
  const user = auth.currentUser;
  
  const username = ref("");
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const errMsg = ref("");
  const successMsg = ref("");
  
  onMounted(() => {
    if (user) {
      username.value = user.displayName || "";
      email.value = user.email || "";
    }
  });
  
  const updateSettings = async () => {
    errMsg.value = "";
    successMsg.value = "";
  
    if (password.value !== confirmPassword.value) {
      errMsg.value = "Passwords do not match";
      return;
    }
  
    try {
      if (email.value !== user.email) {
        await updateEmail(user, email.value);
      }
  
      if (password.value) {
        await updatePassword(user, password.value);
      }
  
      if (username.value !== user.displayName) {
        await updateProfile(user, { displayName: username.value });
      }
  
      successMsg.value = "Settings updated successfully";
    } catch (error) {
      console.error(error);
      errMsg.value = error.message || "Failed to update settings";
    }
  };
  
  const resetForm = () => {
    if (user) {
      username.value = user.displayName || "";
      email.value = user.email || "";
    }
    password.value = "";
    confirmPassword.value = "";
    errMsg.value = "";
    successMsg.value = "";
  };

  
  </script>
  
  <style scoped>
  .account-settings {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 12%;
    padding: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    width: 48%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 15px;
}

.success-message {
  color: green;
  text-align: center;
  margin-bottom: 15px;
}
</style>
  