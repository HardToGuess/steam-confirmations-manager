<template>
  <div class="footer text-centered">
    <a href="javascript:;" @click="openUrl('https://github.com/HardToGuess/steam-confirmations-manager')">Github repository</a>
    &nbsp;
    <a href="javascript:;" @click="openConfigDirectory()">Open config directory</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const {shell} = require('electron')

export default {
  name: 'Footer',
  methods: {
    openConfigDirectory () {
      shell.openItem(this.configDirectoryPath)
    },
    openUrl (url) {
      shell.openExternal(url)
    }
  },
  computed: {
    ...mapGetters({
      configDirectoryPath: 'configDirectoryPath'
    })
  }
}
</script>

<style scoped>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ededed;
    text-align: center;
  }
</style>
