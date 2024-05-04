<template>
  <div :class="{ menu: true, open: show, collapsed: !show }">
    <button @click="show = !show" title="Expand">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
    <li><router-link to="/vault" class="vault-link"><i class="fa-solid fa-vault fa-2xl"></i><span> Vault </span></router-link></li> 
    <li><router-link to="/generator" class="generator-link"><i class="fa-solid fa-key fa-2xl"></i><span> Generator</span></router-link></li>
    <li><i class="fa-solid fa-shield-virus fa-2xl"></i><span> Secure Score</span></li>
    <li><i class="fa-solid fa-user-gear fa-2xl"></i><span> Account Settings</span></li>
    <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
    <li v-if="!isLoggedIn"><router-link to="/sign-in">Login</router-link></li>
    <li @click="handleSignOut" v-if="!isLoggedIn" class="sign-out-btn">Sign out</li>
  </div>
     
</template>

<script>

export default {
  name: 'SideNav',
  data() {
    return {
      show: false,
    };
  },
  
};
</script>

<script setup>
import { defineProps } from 'vue';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase Authentication
import { getAuth } from 'firebase/auth'; // Import getAuth to initialize auth
import router from '@/router'; // Import the router instance from your router configuration file

const props = defineProps({
  isLoggedIn: Boolean,
});

// Initialize auth
const auth = getAuth();

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/sign-in");
  });
};
</script>





<style scoped>
.menu {
  width: 80px; 
  position: fixed;
  z-index: 1;
  top: 146px;
  left: 0.5%;
  background-color: #323230; 
  color: #C1E5E3; 
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  border-width: 15px;
  height: 100%;
  list-style-type: none;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
}

.menu li {
  text-align: center;
  width: 100%;
  padding-bottom: 40px;
  padding-top: 25px;
  text-decoration: none;
}

.menu.open li{
  text-align: left;
  padding-left: 10px;
}
.menu.open {
  width: 250px; 
}

.menu.collapsed li span {
  display: none;
}

.menu.open li span {
  display: inline; 
  text-decoration: none;
}

button {
  background-color: transparent; 
  color: #C1E5E3; 
  border: none;
  cursor: pointer; 
  outline: none;
  font-size: 40px;
  top: 2px;
  position: absolute;
  margin-left: 20px;
}

a:link {
  text-decoration: none;
}

a:visited {
  color: #C1E5E3;
}

.sign-out-btn {
  cursor: pointer;
  color: #fff; /* Text color */
  border: none;
  padding: 2px 2px; /* Adjust padding as needed */
  border-radius: 5px; /* Rounded corners */
  text-align: center;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.sign-out-btn:hover {
  background-color: #f39891; /* Change the background color on hover */
}
</style>
