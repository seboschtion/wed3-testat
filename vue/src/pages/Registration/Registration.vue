<template>
  <div>
    <h1>Registration</h1>

    <form v-on:submit.prevent="register">
      <label>Vorname</label>
      <input type="text" v-model="firstname"/>

      <label>Nachname</label>
      <input type="text" v-model="lastname"/>

      <label>Username</label>
      <input type="text" v-model="username"/>

      <label>Passwort</label>
      <input type="password" v-model="password"/>

      <label>Passwort bestätigen</label>
      <input type="password" v-model="passwordConfirmation"/>
      <label v-if="passwordConfirmation !== password">Die Passwörter stimmen nicht überein</label>

      <button type="submit">Registrieren</button>
    </form>

  </div>
</template>

<script src="./Registration.js"></script>
<style src="./Registration.css"></style>
