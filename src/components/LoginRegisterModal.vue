
<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="close-button" @click="handleClose">x</button>
      <div class="tabs">
        <button :class="{ active: activeTab === 'sign-in' }" @click="activeTab = 'sign-in'">Sign In</button>
        <button :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">Register</button>
      </div>
      <div v-if="activeTab === 'sign-in'">
        <Signin />
      </div>
      <div v-if="activeTab === 'register'">
        <Register />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import Signin from './Signin.vue';
import Register from './Register.vue';

const emits = defineEmits(['close']);
const activeTab = ref('sign-in');
const router = useRouter(); 

const handleClose = () => {
  console.log("Close button clicked");
  emits('close');
  router.push('/');
};
</script>

<style scoped>
.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
}

.modal {
background: white;
padding: 20px;
border-radius: 5px;
width: 400px;
max-width: 90%;
position: relative;
}

.close-button {
position: absolute;
top: 10px;
right: 10px;
background: transparent;
border: none;
font-size: 20px;
cursor: pointer;
}

.tabs {
display: flex;
align-items: center; 
}

.tabs button {
padding: 10px 20px;
border: none;
color: #007bff;
cursor: pointer;
border-radius: 5px 5px 0 0;
position: relative; 
}

.tabs button.active {
background: #0056b3;
color: white;
}

.tabs button.hovered::before {
content: "";
position: absolute;
bottom: -2px; 
left: 0;
width: 100%;
height: 2px; 
background-color: #007bff; 
transform: scaleX(0); 
transition: transform 0.3s ease; 
}

.tabs button.hovered:hover::before {
transform: scaleX(1); 
}

.divider {
width: 1px;
height: 20px; 
background-color: #ccc; 
margin: 0 10px; 
}

</style>
