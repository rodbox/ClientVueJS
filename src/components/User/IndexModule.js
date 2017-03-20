import { ls } from '../Core/localstorage.js'
const state = {
  meta: ls.get('indexModule.meta', 'json', {})
}

const mutations = {
  META: (state, meta) => {
    state.meta = ls.set('indexModule.meta', meta)
  }
}

const getters = {
  meta (state, getters, rootState) { return state.meta }
}

const actions = {
  loadIndex ({state, commit, rootState}, username) {
    // RB Service : user.login
    window.store.dispatch('getService', {
      name: 'user.index',
      dataSend: {
        username: username,
        page: 'index'
      },
      callback (json) {
        commit('META', json.meta)
      },
      beforeSend () {
      },
      error () {
        /* eslint-disable  */
        window.router.push({name: '404'})
      }
    })
  }
}

export const indexModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
