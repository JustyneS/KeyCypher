<template>
  <!--Side menu container-->
  <div :class="{ menu: true, open: show, collapsed: !show }">
    <!--Button to expand and retract menu-->
    <button @click="show = !show" class="expandButton" title="Expand"><i class="fa-solid fa-arrow-right"></i></button>
    <!--Navigation links-->
    <li><router-link to="/vault" class="vault-link"><i class="fa-solid fa-vault fa-2xl"></i><span> Vault </span></router-link></li> 
    <li><router-link to="/generator" class="generator-link"><i class="fa-solid fa-key fa-2xl"></i><span> Generator</span></router-link></li>
    <li><router-link to="/secure-score" class="score-link"><i class="fa-solid fa-shield-virus fa-2xl"></i><span> Secure Score</span></router-link></li>
    <li><i class="fa-solid fa-user-gear fa-2xl"></i><span> Account Settings</span></li>
    <!--Conditional rendering of links based on if the user is logged in or out-->
    <li v-if="!isLoggedIn"><router-link to="/loginregister"><i class="fa-solid fa-sign-in-alt fa-2xl"></i><span>Login</span></router-link></li>
    <li v-if="isLoggedIn" @click="handleSignOut" class="sign-out-btn"><i class="fa-solid fa-sign-out-alt fa-2xl"></i><span>Sign out</span></li>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth'; 

export default {
  name: 'SideNav',
  props: {
    isLoggedIn: Boolean, //Prop to check user is logged in 
  },
  data() {
    return {
      //Visibility control state
      show: false,
    };
  },
  methods: {
    //Sign out method
    handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        //Redirect login/register page after user signs out
        this.$router.push("/loginregister");
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
  top: 20%;
  background-color: #323230; 
  color: #C1E5E3; 
  overflow-x: hidden;
  overflow-y: auto;
  transition: width 0.5s;
  border-width: 15px;
  height: 90%;
  list-style-type: none;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8);
  display: flex; 
  flex-direction: column; 
  justify-content: space-evenly;
}

.menu li {
  text-align: center;
  width: 100%;
  padding-bottom: 40px;
  padding-top: 25px;
  text-decoration: none;
  padding-bottom: 40px;
  padding-top: 25px;
}
.menu li:hover a{
  color: #4ac3ba;
}
.menu li a {
  color: #C1E5E3; 
  text-decoration: none;
}

.menu li a:hover {
  color: #4ac3ba; 
}

.menu li .router-link-active {
  color: #4ac3ba;
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
  margin-left: 20px;
}

button {
  background-color: transparent; 
  color: #C1E5E3; 
  border: none;
  cursor: pointer; 
  outline: none;
  font-size: 24px; 
  position: absolute;
  left: 45px;
  top: 2px;
  transition: left 0.5s, transform 0.5s;
}

.menu.open button {
  left: 190px; 
  transform: rotate(180deg);
}

button:hover {
  color: #4ac3ba;
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

