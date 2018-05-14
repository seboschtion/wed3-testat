<template>
  <nav>
    <ul>
      <div class="left">
        <li><router-link to="new-transaction">Neue Transaktion</router-link></li>
        <li><router-link to="transaction-overview">Alle Transaktionen</router-link></li>
      </div>
      <div class="right">
        <li><router-link to="/logout" class="right">Logout</router-link></li>
      </div>
    </ul>
  </nav>
</template>

<style src="./Nav.css"></style>
