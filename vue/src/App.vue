<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Gothic+A1:300,500,800');

#app {
    font-family: 'Gothic A1', sans-serif;
    font-weight: 300;
    margin: 24px 48px;
}

a {
    color: black;
}
</style>

