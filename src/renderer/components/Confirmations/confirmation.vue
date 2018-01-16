<template>
  <div class="col s12 text-centered">
    <img :src="confirmation.icon.replace('32fx32f', '128x128')"><br/>
    {{confirmation.title}}<br/>
    {{confirmation.receiving}}<br/>
    <a href="javascript:;" v-if="confirmation.offerID" @click="getTraderOfferDetails(confirmation.offerID)">Details</a><br/>
    <a href="javascript:;" @click="respondToConfirmation(confirmation, 'allow')">Confirm</a> or <a href="javascript:;" @click="respondToConfirmation(confirmation, 'cancel')">cancel</a>
    <br/>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'confirmation',
  props: ['confirmation'],
  computed: {
    ...mapGetters({
      botConfigured: 'botConfigured'
    })
  },
  methods: {
    async respondToConfirmation (confirmation, isAllowed) {
      const allow = isAllowed === 'allow' ? 'allow' : 'cancel'
      await this.$store.getters.bot.respondToConfirmation(confirmation, allow)
      const message = 'done'
      this.$store.dispatch('toast', { message })
      this.$store.dispatch('loadConfirmations')
    },
    async getTraderOfferDetails (offerID) {
      this.$store.dispatch('toggleLoadingSpinner', { isSpinnerVisible: true })
      const tradeOfferDetails = await this.$store.getters.bot.getTraderOfferDetails({ id: offerID })
      this.$store.dispatch('setCurrentConfirmationDetails', { confirmationDetails: tradeOfferDetails })
      this.$modal.show('confirmation-details-modal')
    }
  }
}
</script>

<style scoped>

</style>
