<template>
  <div class="vault">
    <!--Navigation buttons for switching between accounts, notes, and addresses tabs-->
    <div class="nav-buttons">
      <button class="nav-button" @click="currentTab = 'accounts'" :class="{ 'active-tab': currentTab === 'accounts' }">Passwords</button>
      <button class="nav-button" @click="currentTab = 'notes'" :class="{ 'active-tab': currentTab === 'notes' }">Notes</button>
      <button class="nav-button" @click="currentTab = 'addresses'" :class="{ 'active-tab': currentTab === 'addresses' }">Addresses</button>
    </div>

    <!--Notes tab content-->
    <div v-show="currentTab === 'notes'" class="tab-content">
      <!-- Displaying Notes from Firebase -->
      <div v-for="note in notes" :key="note.id">
      <div>
        <h2>{{ note.accountName }}</h2>
        <p>{{ note.text }}</p>
      </div>
      <button @click="editNote(note)" class="editButton" title="edit details"><i class="fa-solid fa-gear fa-xl"></i></button>
      </div>
    </div>

  


    <!--Accounts tab content-->
    <div v-show="currentTab === 'accounts'" class="tab-content">
      <!-- Displaying Accounts from Firebase-->
      <div class="account-list-item" v-for="account in accounts" :key="account.name">
        <div>{{ account.name }}</div>
        <div>{{ account.email }}</div>
        <div v-if="account.showPassword">{{ account.password }}</div>
        <div v-else>••••••••</div>
        <!--Button to toggle password visibility-->
        <button @click="togglePassword(account)"><i :class="account.showPassword ? 'fa-solid fa-eye-slash fa-xl' : 'fa-solid fa-eye fa-xl'" :title="account.showPassword ? 'Hide' : 'Show'"></i></button>
        <button @click="editAccount(account)" class="editButton" title="edit details"><i class="fa-solid fa-gear fa-xl"></i></button>
      </div>
    </div>

    <!--Address tab content-->
    <div v-show="currentTab === 'addresses'" class="tab-content">

    <!-- Displaying Addresses from Firebase-->
    <div v-for="address in addresses" :key="address.id">
      <div>
        <h2>{{ address.firstName }} {{ address.lastName }}</h2>
        <p>Address: {{ address.line1 }}, {{ address.suburb }}, {{ address.postcode }}</p>
        <p>Phone Number: {{ address.phoneNumber }}</p>
      </div>
      <button @click="editAddress(address)" class="editButton" title="edit details"><i class="fa-solid fa-gear fa-xl"></i></button>
      </div>
    </div>

    <!--Buttons to show the options for adding a new Account, Note, or Address-->
    <button class="add-button" @click="showOptions = !showOptions" title="Add new"><i class="fa-solid fa-plus"></i></button>
    <div class="options" v-show="showOptions">
      <!--Buttons to add new Account, Note, or Address into Firebase-->
      <button @click="showForm('account')">Add Account</button>
      <button @click="showForm('note')">Add Note</button>
      <button @click="showForm('address')">Add Address</button>
    </div>

    <!--Form for adding a new Account-->
    <form v-show="formType === 'account'">
      <input v-model="newAccount.name" placeholder="URL/Account">
      <input v-model="newAccount.email" placeholder="Username/Email">
      <input v-model="newAccount.password" placeholder="Password">
      <div class="button-group">
        <!--Save & Cancel buttons-->
        <button @click.prevent="saveAccount">Save</button>
        <button @click="cancel">Cancel</button>
      </div> 
      <button class="delete-button" @click.prevent="deleteAccount(newAccount)"><i class="fa-regular fa-trash-can fa-xl"></i></button>
    </form>
    
    <!--Form for adding a new Note-->
    <form v-show="formType === 'note'">
      <input v-model="newNote.accountName" placeholder="Account Name">
      <textarea v-model="newNote.text" placeholder="Note"></textarea>
      <div class="button-group">
        <button @click.prevent="saveNote">Save</button>
        <button @click="cancel">Cancel</button>
      </div>
      <button class="delete-button" @click.prevent="deleteNote(newNote)"><i class="fa-regular fa-trash-can fa-xl"></i></button>
    </form>
    
    <!--Form for adding a new Address-->
    <form v-show="formType === 'address'">
      <input v-model="newAddress.firstName" placeholder="First Name">
      <input v-model="newAddress.lastName" placeholder="Last Name">
      <input v-model="newAddress.line1" placeholder="Address Line 1">
      <input v-model="newAddress.suburb" placeholder="Suburb">
      <input v-model="newAddress.postcode" placeholder="Postcode">
      <input v-model="newAddress.phoneNumber" placeholder="Phone Number">
      <div class="button-group">
        <button @click.prevent="saveAddress">Save</button>
        <button @click="cancel">Cancel</button>
      </div>
      <button class="delete-button" @click.prevent="deleteAddress(newAddress)"><i class="fa-regular fa-trash-can fa-xl"></i></button>
    </form>
  </div>
</template>


<script>
//Firebase modules
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export default {
  name: 'Vault',
  data() {
    return {
      showOptions: false, //Option visibility
      formType: null, 
      newAccount: { name: '', email: '', password: '' },
      newNote: { accountName: '', text: '' },
      newAddress: { firstName: '', lastName: '', line1: '', suburb: '', postcode: '', phoneNumber: '' },
      // Arrays to store fetched data
      accounts: [], 
      currentTab: "accounts",
      notes: [],
      addresses: [],
    };
  },
  created() {
    // Fetch data when a component is created
    this.fetchData();
  },

  methods: {
    //Showing the form based on type
    showForm(type) {
      this.formType = type;
      this.showOptions = false;
    },
    //Function to add a new Account to Firebase
    addAccount() {
      firebase.database().ref('accounts/' + this.newAccount.name).set(this.newAccount)
        .then(() => {
          this.accounts.push({ ...this.newAccount, showPassword: false });
          this.newAccount = { name: '', email: '', password: '' };
        })
        .catch(error => console.error('Error adding account: ', error));
    },
    //Function to add a new Note to Firebase
    addNote() {
      firebase.database().ref('notes/' + this.newNote.accountName).set(this.newNote)
        .then(() => {
        this.newNote = { accountName: '', text: '' };
        this.formType = null;
        })
        .catch(error => console.error('Error adding note: ', error));
    },
    //Function to add a new Address to Firebase
    addAddress() {
      firebase.database().ref('addresses/' + this.newAddress.firstName + this.newAddress.lastName).set(this.newAddress)
        .then(() => {
        this.newAddress = { firstName: '', lastName: '', line1: '', suburb: '', postcode: '', phoneNumber: '' };
        this.formType = null;
      })
      .catch(error => console.error('Error adding address: ', error));
    },
    cancel() {
      this.resetForm();
    },

    //Function to fetch Notes data 
    fetchData() {
      firebase.database().ref('notes').on('value', snapshot => {
        const notes = snapshot.val();
        this.notes = [];
        for (let id in notes) {
          this.notes.push({ ...notes[id], id: id });
        }
      });
      //Function to fetch Accounts data
      firebase.database().ref('accounts').on('value', snapshot => {
        const accounts = snapshot.val();
        this.accounts = [];
        for (let id in accounts) {
          this.accounts.push({ ...accounts[id], id: id, showPassword: false });
        }
      });
      //Function to fetch Address data
      firebase.database().ref('addresses').on('value', snapshot => {
        const addresses = snapshot.val();
        this.addresses = [];
        for (let id in addresses) {
          this.addresses.push({ ...addresses[id], id: id });
        }
      });
    },
    //Function to toggle password visibility
    togglePassword(account) {
      account.showPassword = !account.showPassword;
    },
    //Function to edit an Account
    editAccount(account) {
      this.newAccount = { ...account };
      this.formType = 'account';
    },
    //Functipon to save an Account
    saveAccount() {
      if (this.newAccount.id) {
      // Update the account in Firebase
        firebase.database().ref('accounts').child(this.newAccount.id).set(this.newAccount);
        } else {
      // Add a new account to Firebase
        firebase.database().ref('accounts').push(this.newAccount);
        }
          this.newAccount = { name: '', email: '', password: '' };
          this.formType = null;
    },
    deleteAccount(account) {
      if (confirm('Are you sure you want to delete this account?')) {
    // Delete the account from Firebase
        firebase.database().ref('accounts').child(account.id).remove();
        this.newAccount = { name: '', email: '', password: '' };
        this.formType = null;
      }
    },
    //Function to edit a Note
    editNote(note) {
      this.newNote = { ...note };
      this.formType = 'note';
    },
    //Function to save a note
    saveNote() {
      if (this.newNote.id) {
    // Update the note in Firebase
        firebase.database().ref('notes').child(this.newNote.id).set({
        accountName: this.newNote.accountName,
        text: this.newNote.text
        });
      } else {
    // Add a new note to Firebase
      firebase.database().ref('notes').push({
        accountName: this.newNote.accountName,
        text: this.newNote.text
      });
    }
    this.newNote = { accountName: '', text: '' };
    this.formType = null;
    },
    deleteNote(note) {
      if (confirm('Are you sure you want to delete this note?')) {
      // Delete the note from Firebase
        firebase.database().ref('notes').child(note.id).remove();
        this.newNote = { accountName: '', text: '' };
        this.formType = null;
      }
    },
    //Function to edit an Address
    editAddress(address) {
      this.newAddress = { ...address, id: address.id };
      this.formType = 'address';
    },
    saveAddress() {
  // Update the address in Firebase if it exists, else add a new address
      if (this.newAddress.id) {
        firebase.database().ref('addresses').child(this.newAddress.id).update(this.newAddress);
      } else {
        firebase.database().ref('addresses').push(this.newAddress);
      }
      this.newAddress = { firstName: '', lastName: '', line1: '', suburb: '', postcode: '', phoneNumber: '' };
      this.formType = null;
    },
    deleteAddress(address) {
      if (confirm('Are you sure you want to delete this address?')) {
      // Delete the address from Firebase
        firebase.database().ref('addresses').child(address.id).remove();
        this.newAddress = { firstName: '', lastName: '', line1: '',  suburb: '', postcode: '', phoneNumber: '' };
        this.formType = null;
      }
    },
    cancel() {
      this.resetForm();
    },
  },
};
</script>

<style scoped>
.vault .options {
  position: fixed;
  bottom: 120px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px; 
  padding: 10px; 
}

.vault .options button {
  border: none;
  background-color: #393938; 
  color: #C1E5E3; 
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
}

.vault .options button:hover {
  background-color: #4ac3ba; 
  color: white;
}

.nav-buttons {
  display: flex;
  margin-bottom: 20px;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  justify-content: space-around;
}

.nav-buttons button {
  border: none;
  background-color: #393938; 
  color: #C1E5E3; 
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 10px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
}

.nav-buttons button:hover {
  background-color: #4ac3ba; 
  color: white;
}

.nav-button.active-tab {
  background-color: #4ac3ba;
  color: white;
}

.vault {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  position: relative; 
}

.vault form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  width: 100%; 
  max-width: 300px;
  gap: 10px; 
  z-index: 1;
}

.vault form input {
  margin-bottom: 10px; 
  border-radius: 5px; 
  padding: 5px; 
}

.vault form .button-group {
  display: flex;
  align-items: center;
}

.vault form .button-group button {
  margin-right: 15px;
}

.vault form .delete-button {
  align-self: flex-end;
  margin-top: auto;
  border: none;
}

.vault form input {
  margin-bottom: 10px; 
}

.editButton {
  border: none;
  cursor: pointer;
  background: none;
  margin-left: auto; /* Pushes the button to the right */
}

.vault .add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 4px solid #32323002; 
  border-radius: 80%; 
  width: 80px; 
  height: 80px; 
  display: flex; 
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.633);
  color: #4ac3ba;
  font-size: 70px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.tab-content {
  border: 1px solid #ccc;
  position: absolute;
  top: 40%;
  height: auto;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #f0f0f0; 
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  justify-content: space-evenly;
  font-family: Arial, Helvetica, sans-serif;
  font-size: larger;
}

.tab-content > div {
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tab-content > div:last-child {
  border-bottom: none;
}

.tab-content div button {
  margin-left: 10px;
}

.account-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.account-list-item div {
  flex: 1; 
  text-align: center; 
}

.account-list-item button {
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 5px;
}

.tab-content > div[v-for="note in notes"] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-content > div[v-for="note in notes"] button {
  margin-left: 50px;
}

.tab-content > div[v-for="address in addresses"] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-content > div[v-for="address in addresses"] button {
  margin-right: 0;
}
</style>