<template>
  <div>
    <Title title="Login"/>

    <form id="form-login" v-on:submit.prevent="login">
      <Input label="Benutzername" v-model="username" required/>
      <Input label="Passwort" v-model="password" type="password" required/>
      <button type="submit">Login</button>
      <Error :message="errorMessage"/>
    </form>

    <p id="new-account">Noch kein Account?
      <router-link to="/register">Melde dich hier an!</router-link>
    </p>
  </div>
</template>

<script src="./Login.js"></script>
<style src="./Login.css"></style>
