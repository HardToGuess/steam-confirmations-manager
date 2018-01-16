// const remote = require('electron').remote
// const path = require('path')
const fs = require('fs')

const state = {
  config: {
    username: '',
    password: ''
  }
}

const getters = {
  config: state => state.config,
  botConfigured: state => state.config && state.config.username && state.config.password && state.config.sharedSecret && state.config.identitySecret && state.config.APIKey,
  isAutoBotLoginEnabled: state => state.config && state.config.botAutoLogin
}

const actions = {
  loadConfig ({ commit, getters }) {
    return new Promise((resolve, reject) => {
      const configDirectoryPath = this.getters.configDirectoryPath
      let configFile
      try {
        const readConfigFile = fs.readFileSync(`${configDirectoryPath}\\config.json`)
        configFile = JSON.parse(readConfigFile)
        commit('SET_CONFIG', configFile)
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log('ENOENT')
          const config = {
            username: '',
            password: '',
            sharedSecret: '',
            identitySecret: '',
            APIKey: '',
            botAutoLogin: false
          }
          fs.writeFileSync(`${getters.configDirectoryPath}\\config.json`, JSON.stringify(config))
          commit('SET_CONFIG', config)
          resolve(config)
        }
        reject(err)
      }
      resolve(configFile)
    })
  },
  writeConfigFile ({ commit, getters }, { config }) {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(`${getters.configDirectoryPath}\\config.json`, JSON.stringify(config))
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  setConfig ({ commit }, { config }) {
    commit('SET_CONFIG', config)
  }
}

const mutations = {
  SET_CONFIG (state, config) {
    state.config = config
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
