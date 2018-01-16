<template>
<div>
  <modal name="confirmation-details-modal" :scrollable="true" height="900px">
    <div class="modal-content">
      <div v-if="currentConfirmationDetails && currentConfirmationDetails.id">
        <div class="row">
          <div class="col s6">
            {{currentConfirmationDetails.itemsToGive.length > 0 ? 'Items from you:' : 'You\'ll not lost any items'}}
            <span v-for="(item, index) in currentConfirmationDetails.itemsToGive" :key="index" class="item-to-give">
              {{item.market_name}}
            </span>
          </div>

          <div class="col s6 items-to-receive">
            {{currentConfirmationDetails.itemsToReceive.length > 0 ? 'Items to receive:' : 'You\'ll not receive any items'}}
            <span v-for="(item, index) in currentConfirmationDetails.itemsToReceive" :key="index" class="item-to-receive">
              {{item.market_name}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'confirmation-details-modal',
  components: {},
  computed: {
    ...mapGetters({
      currentConfirmationDetails: 'currentConfirmationDetails'
    })
  }
}
</script>

<style scoped>
  .modal-content {
    padding: 20px;
  }
  .item-to-give, .item-to-receive {
    margin: 0px !important;
    padding: 0px !important;
    display: block;
    width: 100%;
    color: gray;
  }
  .items-to-receive {
    float: right;
  }
  .modal-content {
    height: 150px;
    overflow-y: scroll;
  }
</style>