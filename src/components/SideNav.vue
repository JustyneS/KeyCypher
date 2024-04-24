<template>
  <div :class="{ menu: true, open: show, collapsed: !show }">
    <button @click="show = !show" title="Expand">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
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
  position: absolute;
  z-index: 1;
  top: 155px;
  left: 0px;
  background-color: #323230; 
  color: #4AC3BB; 
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
  padding-bottom: 80px;
  padding-top: 20px;
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
  color: #4AC3BB; 
  border: none;
  cursor: pointer; 
  outline: none;
  font-size: 40px;
  top: -8px;
  position: absolute;
  margin-left: 20px;
}

a:link {
  text-decoration: none;
}

a:visited {
  color: #4AC3BB;
}

</style>
