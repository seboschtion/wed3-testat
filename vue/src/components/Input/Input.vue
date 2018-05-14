<template>
  <label>{{label}}
    <input
      v-bind="$attrs"
      v-bind:value="value"
      v-bind:type="type"
      v-on:input="$emit('input', $event.target.value)"/>
      <small v-if="condition" class="error">Die Passwörter stimmen nicht überein</small>
  </label>
</template>

<script src="./Input.js"></script>
<style src="./Input.css"></style>
