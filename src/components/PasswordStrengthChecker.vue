<template>
    <div class="password-strength-checker">
      <h1>Password Strength Checker</h1>
      <div v-for="(account, index) in sortedAccounts" :key="index" class="entry">
        
        <p>Website: {{ account.name }}</p>
        <p>Email: {{ account.email }}</p>
        <p>Password: 
          <span v-if="!account.editing && account.showPassword">{{ account.password }}</span>
          <span v-else-if="!account.editing">••••••••</span>
          <span v-else>
            <input v-model="account.updatedPassword" type="password">
            <button @click="savePassword(account)">Save</button>
          </span>
          <button v-if="!account.editing" class="eye-button" @click="togglePasswordVisibility(account)">
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
h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
}

  .password-strength-checker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 12%;
  margin-left: auto; 
  margin-right: auto; 
  padding: 20px;
  background-color: #f0f0f0;
  border: 2px solid #ccc; 
  border-radius: 5px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  width: 500px; 
  max-width: 60%; 
  font-family: Arial, Helvetica, sans-serif;
  font-size: larger;
}

.entry {
  border-bottom: 1px solid #ccc; 
  padding-bottom: 10px; 
  margin-bottom: 10px; 
  width: 300px;
}

.eye-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  margin-left: 20px;
  cursor: pointer;
}  

.eye-button i {
  font-size: 18px; 
}

.editBtn {
  display: block;
  width: 30%;
  padding: 5px;
  font-size: 16px;
  background-color: #4ac3ba; 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
    background-color: #FF5252; 
  }
  
  .strength-weak {
    background-color: #FFD740; 
  }
  
  .strength-medium {
    background-color: #FFA726; 
  }
  
  .strength-strong {
    background-color: #4CAF50; 
  }
  
  .strength-very-strong {
    background-color: #64DD17; 
  }
  </style>
  
  
  