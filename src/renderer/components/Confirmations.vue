<template>
  <div>
    <Confirmation  v-for="confirmation in confirmations" v-if="isBotConnectedToSteam" :key="confirmation.id" :confirmation="confirmation" />
    <div v-if="confirmations.length === 0 && bot.online && !isLoading">Nothing to confirm</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Confirmation from './Confirmations/confirmation'

export default {
  name: 'Confirmations',
  components: { Confirmation },
  computed: {
    ...mapGetters({
      botConfigured: 'botConfigured',
      bot: 'bot',
      isLoading: 'isLoading',
      confirmations: 'confirmations',
      isBotConnectedToSteam: 'isBotConnectedToSteam',
      loadingConfirmations: 'loadingConfirmations'
    })
  }
}
</script>

<style scoped>

</style>