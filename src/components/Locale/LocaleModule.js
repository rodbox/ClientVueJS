import { ls } from '../Core/localstorage.js'
const state = {
  locale: {
    current: ls.get('localeModule.locale', 'string', 'fr'),
    locales: ['fr', 'gb', 'es']
  },
  trans: ls.get('localeModule.trans', 'json', {}),
  trans_loaded: ls.get('localeModule.trans_loaded', 'bool', false)
}

const mutations = {
  SET_LOCALE: (state, locale) => {
    state.locale.current = locale
    ls.set('localeModule.locale', locale)
  },
  SET_TRANS: (state, trans) => {
    state.trans = ls.set('localeModule.trans', trans)
    state.trans_loaded = ls.set('localeModule.trans_loaded', true)
  }
}

const getters = {
  locale: state => state.locale.current,
  locales: state => state.locale.locales,
  trans: state => state.locale.trans
}

const actions = {
  setLocale ({state, commit, rootState}, locale) {
    commit('SET_LOCALE', locale)
    // RB Service : trans.load
    window.store.dispatch('getService', {
      name: 'trans.load',
      dataSend: {
        locale: state.locale.current
      },
      callback: (json) => {
        commit('SET_TRANS', json)
      },
      beforeSend: () => {
      }
    })
  },
  trans () {
    return state.trans
  },
  isTrans ({store, state, dispatch}) {
    console.log(state.trans_loaded)
    if (!state.trans_loaded) {
      dispatch('setLocale', state.locale.current)
    }
  }
}

export const localeModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
