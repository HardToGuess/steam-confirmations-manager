<template>
  <div id="wrapper">
    <main>
      <div v-if="!botConfigured">Bot is not configured yet, <router-link to="config">configure now?</router-link></div>
      <BotStateControl />

      <div v-if="botConfigured">
        <Confirmations />
        <ConfirmationDetailsModal />
      </div>
    </main>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BotStateControl from './Index/BotStateControl'
  import Confirmations from './Confirmations'
  import ConfirmationDetailsModal from './Confirmations/confirmation-details-modal'

  export default {
    name: 'index',
    components: { BotStateControl, Confirmations, ConfirmationDetailsModal },
    computed: {
      ...mapGetters({
        config: 'config',
        botConfigured: 'botConfigured',
        currentConfirmationDetails: 'currentConfirmationDetails',
        steamImageRootUrl: 'steamImageRootUrl'
      })
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
