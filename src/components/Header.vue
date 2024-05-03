<template>
  <div class="header">
    <img src="../images/logo.png" alt="Logo" class="header-logo">
  </div>
</template>

<script>
export default {
  name: 'Header',
};

</script>

<style scoped>
.header-logo {
  width: 99%;
  height: 20%;
  position: fixed;
  top: 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);
}
</style>