<template>
  <div>
    <Title title="Login"/>

    <form v-on:submit.prevent="login">
      <label>Benutzername</label>
      <input type="text" v-model="username" />

      <label>Passwort</label>
      <input type="password" v-model="password" />

      <button type="submit">Login</button>
    </form>

    <p>Noch kein Account? <router-link to="/register">Melde dich hier an!</router-link></p>
  </div>
</template>

<script src="./Login.js"></script>
<style src="./Login.css"></style>
