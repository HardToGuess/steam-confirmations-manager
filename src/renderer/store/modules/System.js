import Materialize from 'materialize-css/dist/js/materialize.js'
const remote = require('electron').remote
const path = require('path')
// const fs = require('fs')

const state = {
  configDirectoryPath: '',
  isLoading: false,
  steamImageRootUrl: 'http://community.edgecast.steamstatic.com/economy/image/'
}

const getters = {
  configDirectoryPath: state => state.configDirectoryPath,
  isLoading: state => state.isLoading,
  steamImageRootUrl: state => state.steamImageRootUrl
}

const actions = {
  toast ({ commit }, { message }) {
    Materialize.toast(message, 4000)
  },
  getConfigDirectoryPath ({ commit }) {
    return new Promise((resolve, reject) => {
      const appPath = remote.app.getAppPath()
      resolve(path.dirname(appPath))
    })
  },
  setConfigDirectoryPath ({ commit }, { configDirectoryPath }) {
    commit('SET_CONFIG_DIRECTORY_PATH', configDirectoryPath)
  },
  toggleLoadingSpinner ({ commit }, { isSpinnerVisible }) {
    commit('TOGGLE_LOADING_SPINNER', isSpinnerVisible)
  }
}

const mutations = {
  SET_CONFIG_DIRECTORY_PATH (commit, configDirectoryPath) {
    state.configDirectoryPath = configDirectoryPath
  },
  TOGGLE_LOADING_SPINNER (commit, isSpinnerVisible) {
    state.isLoading = isSpinnerVisible
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
