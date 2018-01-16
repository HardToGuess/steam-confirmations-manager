<template>
  <div>
    Application for easy Steam confirmations management.<br/>
    Will be useful for you if you have a Steam bot with enabled two-factor authentication <br/>
    Guide how to create Steam bot can be found <a href="javascript:;" @click="openUrl('https://github.com/andrewda/node-steam-guide')">here</a><br/>
    If you'll get any problems with app, please <a href="javascript:;" @click="openUrl('https://github.com/HardToGuess/steam-confirmations-manager/issues/new')">create new issue</a>.
  </div>
</template>

<script>
const { shell } = require('electron')
export default {
  name: 'About',
  methods: {
    openUrl (url) {
      shell.openExternal(url)
    }
  }
}
</script>