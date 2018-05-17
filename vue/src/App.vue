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
    margin: 24px 24px;
}

a {
    color: black;
}

a:hover {
    background-color: black;
    color: white;
}

button {
    border: none;
    cursor: pointer;
    width: 100%;
    padding: 12px;
    background-color: black;
    color: white;
    margin-bottom: 4px;
    outline: 1px black solid;
}

button:hover {
    margin-bottom: 0px;
    border: white solid;
    border-width: 0px 0px 4px 0px;
    outline: 1px black solid;
}

@media(min-width: 960px) {
    #app {
        margin: 24px 48px;
    }
}
</style>

