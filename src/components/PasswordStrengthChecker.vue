<template>
    <div class="password-strength-checker">
      <h1>Password Strength Checker</h1>
      <div v-for="(account, index) in sortedAccounts" :key="index">
        <h2>{{ account.name }}</h2>
        <p>Website: {{ account.name }}</p>
        <p>Email: {{ account.email }}</p>
        <p>
          Password: 
          <span v-if="!account.editing && account.showPassword">{{ account.password }}</span>
          <span v-else-if="!account.editing">••••••••</span>
          <span v-else>
            <input v-model="account.updatedPassword" type="password">
            <button @click="savePassword(account)">Save</button>
          </span>
          <button v-if="!account.editing" @click="togglePasswordVisibility(account)">
            <i :class="account.showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" :title="account.showPassword ? 'Hide' : 'Show'"></i>
          </button>
        </p>
        <p class="passStrField">Password Strength: {{ getPasswordStrength(account.password) }}</p>
        <div class="strength-bar" :class="getStrengthClass(account.password)"></div>
        <button class="editBtn" v-if="!account.editing" @click="editPassword(account)">Edit</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { getDatabase, ref as dbRef, update, onValue } from 'firebase/database';
  import zxcvbn from 'zxcvbn'; // Import zxcvbn library
  
  const accounts = ref([]);
  const database = getDatabase();
  
  onMounted(async () => {
    const accountsRef = dbRef(database, 'accounts');
    onValue(accountsRef, (snapshot) => {
      const data = snapshot.val();
      accounts.value = Object.keys(data).map(key => ({ id: key, ...data[key], showPassword: false, editing: false, updatedPassword: '' }));
    });
  });
  
  const getPasswordStrength = (password) => {
    // Calculate password strength using zxcvbn
    const result = zxcvbn(password);
    // Map the zxcvbn score to password strength levels
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
  
  const togglePasswordVisibility = (account) => {
    account.showPassword = !account.showPassword;
  };
  
  const editPassword = (account) => {
    account.editing = true;
    account.updatedPassword = account.password;
  };
  
  const savePassword = (account) => {
    account.password = account.updatedPassword;
    account.editing = false;
  
    // Update the password in the database
    update(dbRef(database, `accounts/${account.id}`), {
      password: account.password
    });
  };
  
  // Computed property to sort accounts by password strength
  const sortedAccounts = computed(() => {
    return [...accounts.value].sort((a, b) => {
      const strengthOrder = {
        "Very Weak": 0,
        "Weak": 1,
        "Medium": 2,
        "Strong": 3,
        "Very Strong": 4,
      };
      return strengthOrder[getPasswordStrength(a.password)] - strengthOrder[getPasswordStrength(b.password)];
    });
  });
  
  // Method to get the CSS class for strength bar color
  const getStrengthClass = (password) => {
    const strength = getPasswordStrength(password);
    return `strength-${strength.toLowerCase().replace(/\s+/g, '-')}`;
  };
  </script>
  


  <style scoped>
  .password-strength-checker {
    margin-top: 200px;
    margin-left:600px;
  }
  
.passStrField {
    margin-bottom: 0px;
}

.editBtn {
    margin-top: 10px;
}

  .strength-bar {
    height: 10px;
    
    max-width: 300px;

  }
  
  .strength-very-weak {
    background-color: #FF5252; /* Red */
  }
  
  .strength-weak {
    background-color: #FFD740; /* Orange */
  }
  
  .strength-medium {
    background-color: #FFA726; /* Deep Orange */
  }
  
  .strength-strong {
    background-color: #4CAF50; /* Green */
  }
  
  .strength-very-strong {
    background-color: #64DD17; /* Light Green */
  }
  </style>
  
  
  