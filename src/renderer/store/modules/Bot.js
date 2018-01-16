import Materialize from 'materialize-css/dist/js/materialize.js'
// import Vue from 'vue'
const events = require('events')
const SteamUser = require('steam-user')
const SteamCommunity = require('steamcommunity')
const SteamTotp = require('steam-totp')
const SteamTradeOffers = require('steam-tradeoffers')
const TradeOfferManager = require('steam-tradeoffer-manager')

class Bot {
  constructor ({ config, client }) {
    this.community = new SteamCommunity()
    this.client = client
    this.offers = new SteamTradeOffers()
    this.eventEmitter = new events.EventEmitter()
    this.username = config.username
    this.password = config.password
    this.sharedSecret = config.sharedSecret
    this.identitySecret = config.identitySecret
    this.APIKey = config.APIKey
    this.online = false

    this.client.setOption('promptSteamGuardCode', false)
    this.tradeOfferManager = new TradeOfferManager({
      'steam': this.client, // Polling every 30 seconds is fine since we get notifications from Steam
      'domain': 'example.com',
      'language': 'en' // We want English item descriptions
    })

    this.client.on('error', (err) => {
      console.log(err)
      Materialize.toast(err.message, 3000)
    })
    // If two-factor auth code incorrect, retry in 5 seconds
    this.client.on('steamGuard', (d, cb, lastCodeWrong) => {
      lastCodeWrong && setTimeout(() => {
        console.log(`Last auth code for bot ${this.username} was wrong, trying to login now`)
        this.login()
      }, 5000)
    })

    this.client.on('loggedOn', () => { console.log(`Bot ${this.username} logged on`) })

    this.client.on('webSession', (sessionId, cookies) => {
      console.log('Got cookies from steam')
      this.webCookies = cookies
      // Set web cookies
      this.tradeOfferManager.setCookies(cookies, (err) => {
        if (err) return console.log('Cant set manager web cookies')
      })

      this.community.setCookies(cookies)

      // Go online (set persona state 'online')
      this.setStatusOnline()
    })

    this.client.on('disconnected', () => { this.online = false })
  }

  login () {
    this.client.logOn({
      'accountName': this.username,
      'password': this.password,
      'twoFactorCode': SteamTotp.generateAuthCode(this.sharedSecret)
    })
  }

  updateBotState () {
    console.log(this)
  }

  setupOffers () {
    this.offers.setup({
      sessionID: this.community.getSessionID(),
      webCookie: this.webCookies,
      APIKey: this.APIKey
    })
    this.eventEmitter.emit('offersSetup')
  }

  setStatusOnline () {
    this.client.setPersona(SteamUser.Steam.EPersonaState.Online)
    this.eventEmitter.emit('online')
    this.online = true
  }

  // Loads available confirmations
  processConfirmations () {
    return new Promise((resolve, reject) => {
      const time = Math.floor(Date.now() / 1000)
      const key = SteamTotp.getConfirmationKey(this.identitySecret, time, 'conf')
      this.community.getConfirmations(time, key, (err, confirmations) => {
        if (err) {
          if (err === 'Not Logged In') {
            this.bot.login()
          }
          console.log(err)
          return reject(err)
        }
        resolve(confirmations)
      })
    })
  }

  // Allow or Cancel confirmation
  respondToConfirmation (confirmation, tag) {
    return new Promise((resolve, reject) => {
      const timeNow = Math.floor(Date.now() / 1000)
      // tag can be 'allow', 'details' or 'cancel'
      const allow = tag === 'allow'
      const confirmationKey = SteamTotp.getConfirmationKey(this.identitySecret, timeNow, tag)
      this.community.respondToConfirmation(confirmation.id, confirmation.key, timeNow, confirmationKey, allow, (result) => {
        resolve()
      })
    })
  }

  // Loads trade offer details (items in offer etc.)
  getTraderOfferDetails ({ id }) {
    return new Promise((resolve, reject) => {
      this.tradeOfferManager.getOffer(id, (err, offerDetails) => {
        if (err) {
          return reject(err)
        }
        resolve(offerDetails)
      })
    })
  }
}

const state = {
  bot: {
    client: new SteamUser(),
    community: new SteamCommunity(),
    offers: new SteamTradeOffers(),
    isBotConnectedToSteam: false,
    username: '',
    password: '',
    sharedSecret: '',
    identitySecret: '',
    APIKey: '',
    botAutoLogin: false,
    online: false
  }
}

const getters = {
  bot (state) {
    return state.bot
  },
  isBotConnectedToSteam (state) {
    return state.bot.online
  }
}

const actions = {
  createBot ({ commit, getters }) {
    commit('CREATE_BOT', getters.config)
  },
  botLogin ({ commit, getters }) {
    const bot = getters.bot
    if (bot) {
      commit('TOGGLE_LOADING_SPINNER', true)
      bot.login()
    }
  },
  botLogout ({ commit }) {
    commit('BOT_LOGOUT')
  }
}

const mutations = {
  CREATE_BOT (commit, config) {
    const client = new SteamUser()
    // Without this 'client.client.connected' property will be not reactive
    client.client.connected = false
    state.bot = new Bot({ config, client })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
