<template>
  <div class="row">
      <div class="col s12">
        <input type="checkbox" class="filled-in botAutoLogin" id="filled-in-box" :checked="isAutoBotLoginEnabled"/>
        <label for="filled-in-box">Automatically login to Steam on startup</label>
      </div>
      <div class="input-field col s12">
        <input v-bind:placeholder="config.username" id="username" type="text" class="validate" v-model="username">
        <label for="username">Username</label>
      </div>
      <div class="input-field col s12">
        <input v-bind:placeholder="config.password" id="password" type="password" class="validate" v-model="password">
        <label for="password">Password</label>
      </div>
      <div class="input-field col s12">
        <input v-bind:placeholder="config.sharedSecret" id="sharedSecret" type="text" class="validate" v-model="sharedSecret">
        <label for="sharedSecret">Shared secret</label>
      </div>
      <div class="input-field col s12">
        <input v-bind:placeholder="config.identitySecret" id="identitySecret" type="text" class="validate" v-model="identitySecret">
        <label for="identitySecret">Identity secret</label>
      </div>
      <div class="input-field col s12">
        <input v-bind:placeholder="config.APIKey" id="APIKey" type="text" class="validate" v-model="APIKey">
        <label for="APIKey">API Key</label>
      </div>
      <div class="input-field col s12">
        <a href="javascript:;" class="btn grey darken-3 width100" @click="saveConfig()">Save settings</a>
      </div>
  </div>
</template>

<script>
import TopBar from './TopBar'
import { mapGetters } from 'vuex'

export default {
  name: 'config',
  data () {
    return {
      username: '',
      password: '',
      sharedSecret: '',
      identitySecret: '',
      APIKey: '',
      botAutoLogin: false
    }
  },
  components: {
    TopBar
  },
  methods: {
    async saveConfig () {
      try {
        const config = {
          username: this.username || this.config.username,
          password: this.password || this.config.password,
          sharedSecret: this.sharedSecret || this.config.sharedSecret,
          identitySecret: this.identitySecret || this.config.identitySecret,
          APIKey: this.APIKey || this.config.APIKey,
          botAutoLogin: $('.botAutoLogin').is(':checked')
        }
        try {
          await this.$store.dispatch('writeConfigFile', { config })
          await this.$store.dispatch('loadConfig')
          this.$store.dispatch('toast', { message: `Settings saved ${this.bot.online ? '[bot offline]' : ''}` })
          await this.$store.dispatch('createBot')
        } catch (err) {
          this.$store.dispatch('toast', { message: 'Error while saving settings' })
          console.log(err)
        }
        this.username = this.password = this.sharedSecret = this.identitySecret = this.APIKey = ''
      } catch (err) {
        console.log(err)
      }
    },
    resetForm () {
      const inputSelector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea'
      $(document).ready(function () {
        $(inputSelector).each(function (index, element) {
          $(this).siblings('label, i').addClass('active')
        })
      })
    }
  },
  async created () {
    this.resetForm()
  },
  computed: {
    ...mapGetters({
      config: 'config',
      configDirectoryPath: 'configDirectoryPath',
      isAutoBotLoginEnabled: 'isAutoBotLoginEnabled',
      bot: 'bot'
    })
  }
}
</script>

<style scoped>
  .width100 {
    min-width: 100% !important;
  }
</style>