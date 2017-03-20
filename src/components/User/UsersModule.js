import { ls } from '../Core/localstorage.js'
const state = {
  users: ls.get('usersModule.users', 'json', {}),
  loaded: ls.get('usersModule.loaded', 'json', false)
}

const mutations = {
  USERS: (state, users) => {
    state.users = ls.set('usersModule.users', users)
  },
  LOADED: (state, bool) => {
    state.loaded = ls.set('usersModule.loaded', bool)
  }
}

const getters = {
  users (state, getters, rootState) { return state.users },
  loaded (state, getters, rootState) { return state.loaded }
}

const actions = {
  all ({state, commit, rootState}) {
    // RB Service : user.login
    window.store.dispatch('getService', {
      name: 'user.all',
      dataSend: {
        t: 't'
      },
      callback: (json) => {
        commit('USERS', json)
        commit('LOADED', true)
      },
      beforeSend: () => {
      }
    })
  },
  serverScan ({state, commit, rootState}, data) {
    // RB Service : user.login
    window.store.dispatch('getService', {
      name: 'user.server_scan',
      dataSend: data,
      callback: (json) => {
        console.log(json)
      },
      beforeSend: () => {
      }
    })
  }
}

export const usersModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
