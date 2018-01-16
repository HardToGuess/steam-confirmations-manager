<template>
  <div>
    <pulse-loader :loading="isLoading" color="#102938" size="24px"></pulse-loader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'loading-spinner',
  components: { PulseLoader },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  }
}
</script>

<style scoped>

</style>
