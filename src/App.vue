<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  created() {
    this.$store.dispatch('tryLogin')
    console.log(this.$store.getters.isAuthenticated)
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
