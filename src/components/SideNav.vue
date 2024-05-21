<template>
  <div :class="{ menu: true, open: show, collapsed: !show }">
    <button @click="show = !show" title="Expand">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
    <li><router-link to="/vault" class="vault-link"><i class="fa-solid fa-vault fa-2xl"></i><span> Vault </span></router-link></li> 
    <li><router-link to="/generator" class="generator-link"><i class="fa-solid fa-key fa-2xl"></i><span> Generator</span></router-link></li>
    <li><i class="fa-solid fa-shield-virus fa-2xl"></i><span> Secure Score</span></li>
    <li><i class="fa-solid fa-user-gear fa-2xl"></i><span> Account Settings</span></li>
    <li v-if="!isLoggedIn"><router-link to="/register"><i class="fa-solid fa-user-plus fa-2xl"></i><span>Register</span></router-link></li>
    <li v-if="!isLoggedIn"><router-link to="/sign-in"><i class="fa-solid fa-sign-in-alt fa-2xl"></i><span>Login</span></router-link></li>
    <li v-if="isLoggedIn" @click="handleSignOut" class="sign-out-btn"><i class="fa-solid fa-sign-out-alt fa-2xl"></i><span>Sign out</span></li>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth'; 

export default {
  name: 'SideNav',
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push("/sign-in");
      });
    },
  },  
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
  margin-left:20px;
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
  color: #fff; 
  border: none;
  padding: 2px 2px; 
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease; 
}

.sign-out-btn:hover {
  background-color: #f39891; 
}
</style>
