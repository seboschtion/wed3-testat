<template>
  <div>
    <Title title="Registration"/>

    <form v-on:submit.prevent="register">
      <Input label="Vorname" v-model="firstname"/>
      <Input label="Nachname" v-model="lastname"/>
      <Input label="Benutzername" v-model="username"/>
      <Input label="Passwort" type="password" v-model="password"/>
      <Input label="Passwort bestätigen" type="password" v-model="passwordConfirmation"/>
      <p class="error">{{errorMessage}}</p>
      <button type="submit">Registrieren</button>
    </form>

  </div>
</template>

<script src="./Registration.js"></script>
<style src="./Registration.css"></style>
