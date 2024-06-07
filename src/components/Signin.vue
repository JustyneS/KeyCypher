<template>
  <div class="signin-container">
    <h1>Sign in to an account</h1>
    <p>
      <input type="text" placeholder="Email" v-model="email" />
    </p>
    <p class="password-container">
      <input :type="passwordFieldType" placeholder="Password" v-model="password" />
      <i :class="passwordFieldIcon" @click="togglePasswordVisibility"></i>
    </p>
    <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
    <p><button @click="signIn">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "vue-router";


const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

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

const signIn = () => {
  const auth = getAuth();
  const emailValue = email.value.trim(); 
  const passwordValue = password.value.trim(); 

  if (!emailValue || !passwordValue) {
    errMsg.value = "Email and password fields can't be empty";
    return; 
  }


  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully signed in!");
      router.push("/generator");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/vault");
    })
    .catch((error) => {
      
    });
};

let sessionTimeout;
const resetSession = () => {
  errMsg.value = "Session timed out. Please sign in again.";
  signOutUser(); 
};

// Function to start the session timer
const startSessionTimer = () => {
  sessionTimeout = setTimeout(resetSession, 900000); // set 15 minutes limit
};

// Function to clear the session timer
const clearSessionTimer = () => {
  clearTimeout(sessionTimeout);
};

// Watch for changes in email and password fields and restart the session timer
watch([email, password], () => {
  clearSessionTimer(); // Clear the existing timer
  startSessionTimer(); // Start a new timer
});

// Function to sign out the user
const signOutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      
      router.push("/signin");
    })
    .catch((error) => {
      console.log(error);
    });
};


startSessionTimer();
</script>


<style scoped>
.signin-container {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 300px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

input[type="text"],
input[type="password"],
input[type="text"][type="password"] {
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

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 15px;
}
</style>