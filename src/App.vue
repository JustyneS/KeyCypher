<template>
    <div id="app">
        <Header />
        <SideNav />
        <router-view />
      <!-- Other components go here -->
    </div>
  </template>
  
  <script>
  import SideNav from './components/SideNav.vue';
  import Header from './components/Header.vue';
  
  export default {
    name: 'App',
    components: {
      Header,
      SideNav,
    },
  };
  </script>
  
  <style>
  /* Global styles */
  body {
    background-color: #D9D9D9;
  }

  </style>
  