<template>
  <div v-if="botConfigured">
    <br/>
    <div v-if="!isBotConnectedToSteam">
      <div class="notification-circle red"></div>&nbsp;offline now <a href="javascript:;" @click="login()">go online</a>
    </div>
    <div v-else-if="isBotConnectedToSteam">
      <div class="notification-circle green"></div>&nbsp;online <a href="javascript:;" @click="logOut()">go offline</a>
    </div>
    <br/>
    <a href="javascript:;" v-if="isBotConnectedToSteam && !isLoading" @click="processConfirmations()">Reload confirmations</a>
    <br/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'bot-state-control',
  methods: {
    async createBot () {
      await this.$store.dispatch('createBot')
    },
    login () {
      this.$store.dispatch('botLogin')
    },
    logOut () {
      this.$store.getters.bot.client.logOff()
    },
    async processConfirmations () {
      this.$store.dispatch('loadConfirmations')
    }
  },
  computed: {
    ...mapGetters({
      botConfigured: 'botConfigured',
      bot: 'bot',
      isBotConnectedToSteam: 'isBotConnectedToSteam',
      confirmations: 'confirmations',
      isLoading: 'isLoading'
    })
  },
  watch: {
    'bot.online': function (isBotConnectedToSteam) {
      if (isBotConnectedToSteam) {
        // If conntected to Steam, load confirmations
        this.$store.dispatch('toggleLoadingSpinner', { isSpinnerVisible: false })
        this.$store.dispatch('loadConfirmations')
      } else {
        // If disconnected from Steam, clear confirmations
        this.$store.dispatch('setConfirmations', { confirmations: [] })
      }
    }
  }
}
</script>

<style scoped>
  .notification-circle {
    border-radius: 50%;
    height: 22px;
    width: 22px;
    display: inline-block;
    vertical-align: middle;
  }
</style>