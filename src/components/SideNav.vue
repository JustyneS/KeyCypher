<template>
  <div :class="{ menu: true, open: show, collapsed: !show }">
    <button @click="show = !show" title="Expand"><i class="fa-solid fa-arrow-right"></i></button>
    <li><router-link to="/vault" class="vault-link"><i class="fa-solid fa-vault fa-2xl"></i><span> Vault </span></router-link></li> 
    <li><i class="fa-solid fa-key fa-2xl"></i><span>  Generator</span></li>
    <li><i class="fa-solid fa-shield-virus fa-2xl"></i><span> Secure Score</span></li>
    <li><i class="fa-solid fa-user-gear fa-2xl"></i><span> Account Settings</span></li>
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
  overflow-y: auto;
  transition: 0.5s;
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
  text-decoration: none;
  padding-bottom: 40px;
  padding-top: 25px;
}
.menu li:hover a{
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

button:hover{
  color: #4ac3ba;
}

a:link {
  text-decoration: none;
}

a:visited {
  color: #C1E5E3;
}

</style>
