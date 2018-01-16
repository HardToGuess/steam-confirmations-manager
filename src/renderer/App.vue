<template>
  <div id="app">
    <div class="loading-spinner">
      <LoadingSpinner />
    </div>
    <div class="container">
      <TopBar/>
    </div>
    <div class="container">
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
    </div>
    <Footer />
  </div>
</template>

<script>
  import TopBar from './components/TopBar'
  import Footer from './components/TheFooter'
  import LoadingSpinner from './components/TheLoadingSpinner'
  export default {
    name: 'steam-confirmation-manager',
    components: {
      TopBar, Footer, LoadingSpinner
    },
    async created () {
      const configDirectoryPath = await this.$store.dispatch('getConfigDirectoryPath')
      this.$store.dispatch('setConfigDirectoryPath', { configDirectoryPath })
      await this.$store.dispatch('loadConfig')
      if (this.$store.getters.botConfigured) {
        await this.$store.dispatch('createBot')
      }
      if (this.$store.getters.botConfigured && this.$store.getters.isAutoBotLoginEnabled) {
        await this.$store.dispatch('botLogin')
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');

  body { font-family: 'Roboto', sans-serif; }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .text-centered {
    text-align: center !important;
  }
  .isLoading {
    background-color: gray;
  }
  .loading-spinner {
    position: fixed;
    top: 50%;
    left: 45%;
  }
</style>
