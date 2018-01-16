<template>
<div class="row">
  <div class="col s12">
    <router-link to="index" v-bind:class="{ 'active-route': isRouteActive('index') }">Manage confirmations</router-link>
    &nbsp;
    <router-link to="config" v-bind:class="{ 'active-route': isRouteActive('config') }">Settings</router-link>
    &nbsp;
    <router-link to="about" v-bind:class="{ 'active-route': isRouteActive('about') }">About</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'top-bar',
  methods: {
    isRouteActive (route) {
      const currentRoute = this.$route.name
      return currentRoute === route
    }
  }
}
</script>

<style scoped>
  .active-route {
    text-decoration: underline;
  }
</style>
