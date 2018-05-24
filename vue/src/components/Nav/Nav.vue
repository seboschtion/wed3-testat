<template>
  <nav>
    <ul>
      <div class="left">
        <li><router-link to="new-transaction">Neue Transaktion</router-link></li>
        <li><router-link to="transaction-overview">Alle Transaktionen</router-link></li>
      </div>
      <div class="right">
        <li><a @click="logout()" class="right" href="#">Logout</a></li>
      </div>
    </ul>
  </nav>
</template>

<script src="./Nav.js"></script>
<style src="./Nav.css"></style>
