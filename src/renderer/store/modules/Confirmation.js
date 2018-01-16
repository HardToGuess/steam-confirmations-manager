const state = {
  confirmations: [],
  loadingConfirmations: false,
  currentConfirmationDetails: {}
}

const getters = {
  confirmations: state => state.confirmations,
  currentConfirmationDetails: state => state.currentConfirmationDetails,
  loadingConfirmations: state => state.loadingConfirmations
}

const actions = {
  setConfirmations ({ commit }, { confirmations }) {
    commit('SET_CONFIRMATIONS', confirmations)
  },
  async loadConfirmations ({ commit, getters }) {
    commit('TOGGLE_LOADING_SPINNER', true)
    const bot = getters.bot
    let confirmations
    try {
      confirmations = await bot.processConfirmations()
      commit('SET_CONFIRMATIONS', confirmations)
      commit('TOGGLE_LOADING_SPINNER', false)
    } catch (err) {
      console.log(err)
    }
  },
  setCurrentConfirmationDetails ({ commit }, { confirmationDetails }) {
    commit('SET_CURRENT_CONFIRMATION_DETAILS', confirmationDetails)
    commit('TOGGLE_LOADING_SPINNER', false)
  }
}

const mutations = {
  SET_CONFIRMATIONS (commit, confirmations) {
    state.confirmations = confirmations
  },
  SET_LOADING_CONFIRMATIONS (commit, isLoading) {
    state.loadingConfirmations = isLoading
  },
  SET_CURRENT_CONFIRMATION_DETAILS (commit, confirmationDetails) {
    state.currentConfirmationDetails = confirmationDetails
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
