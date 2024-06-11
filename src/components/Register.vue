<template>
  <div class="register-container">
    <h1>Create an account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p class="password-container">
      <input :type="passwordFieldType" placeholder="Password" v-model="password" />
      <i :class="passwordFieldIcon" @click="togglePasswordVisibility"></i>
    </p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      console.log("Successfully registered!");
      router.push('/generator');
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/generator");
    })
    .catch((error) => {
      console.error(error); 
    });
};

const passwordFieldType = ref("password");
const passwordFieldIcon = ref("fa fa-eye");

const togglePasswordVisibility = () => {
  if (passwordFieldType.value === "password") {
    passwordFieldType.value = "text";
    passwordFieldIcon.value = "fa fa-eye-slash";
  } else {
    passwordFieldType.value = "password";
    passwordFieldIcon.value = "fa fa-eye";
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;

  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.password-container {
  position: relative;
}

.password-container i {
  position: absolute;
  right: 10px;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
}

button {
  width: 100%;
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
</style>