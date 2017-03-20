import { ls } from '../Core/localstorage.js'
import $ from 'jquery'
import bootbox from 'bootbox'
import translate from '../../filter.js'
const state = {
  user: ls.get('userModule.user', 'json', {
    meta: {
      color: '',
      bg: '',
      bgimg: '',
      bgopacity: '',
      subtext: ''
    }
  }),
  login: {
    username: '',
    pw: ''
  },
  form: {
    user: ''
  },
  connected: ls.get('userModule.connected', 'bool', false),
  context: {}
}

const mutations = {
  FORM: (state, item) => {
    state.login = item
  },
  LOGIN: (state, item) => {
    state.user = item
    ls.set('userModule.user', state.user)

    state.connected = true
    ls.set('userModule.connected', true)
  },
  META: (state, meta) => {
    state.user.meta = meta
    ls.set('userModule.user', state.user)
  },
  LOGOUT: (state) => {
    state.connected = false
    ls.set('userModule.connected', false)

    state.user = {}
    ls.set('userModule.user', {})
  }
}

const getters = {
  user (state, getters, rootState) { return state.user },
  login (state, getters, rootState) { return state.login },
  connected (state) { return state.connected },
  context (state) { return state.context },
  form (state) { return state.form }
}

const actions = {
  setLogin ({state, commit, rootState}) {
    // RB Service : user.login
    // do something in the background
    window.store.dispatch('getService', {
      name: 'user.login',
      dataSend: state.login,
      callback: (json) => {
        window.dialog.modal('hide')
        window.dialog = bootbox.dialog({
          size: 'small',
          message: '<span class="text-center">' + translate('msg.hello') + ' <strong>' + json.username + '</strong></span>',
          closeButton: false
        })
        setTimeout(() => {
          window.dialog.modal('hide')
        }, 4000)
        commit('LOGIN', json)
        window.router.push({name: 'home'})
      },
      beforeSend: () => {
        $('#login').modal('hide')
        window.dialog = bootbox.dialog({
          size: 'small',
          message: '<span class="text-center">' + translate('msg.wait') + '...</span>',
          closeButton: false
        })
      }
    })
  },
  setLogout ({state, commit, rootState}) {
    // RB Service : user.login
    window.store.dispatch('getService', {
      name: 'user.logout',
      dataSend: state.user,
      callback: (json) => {
        window.dialog.modal('hide')
        window.dialog = bootbox.dialog({
          size: 'small',
          message: '<span class="text-center">' + translate('msg.logout') + '</span>'
        })
        commit('LOGOUT')
        window.router.push({name: 'home'})
      },
      beforeSend: () => {
        window.dialog = bootbox.dialog({
          size: 'small',
          message: '<span class="text-center">' + translate('msg.wait') + '...</span>',
          closeButton: false
        })
      }
    })
  },
  setMeta ({state, commit, rootState}, meta) {
    // RB Service : user.login
    window.store.dispatch('getService', {
      name: 'user.setMeta',
      dataSend: meta,
      callback (json) {
        commit('META', json)
      },
      beforeSend () {
      }
    })
  },
  updUser ({state}, values) {
    console.log(values)
  },
  secure ({state}) {
    if (!state.connected) {
      window.router.push({name: 'login'})
    }
  }
}

export const userModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
