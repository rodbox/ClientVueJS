import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { ls } from './components/Core/localstorage.js'
import $ from 'jquery'
import _ from 'lodash'
import bootbox from 'bootbox'
import translate from './filter.js'

const state = {
  title: 'Rodbox',
  key: '673F8FEZ423F4HJK',
  loader: false,
  url: 'http://client.rodbox.fr',
  force: false,
  headerCss: '',
  ui: {
    quickbar: ls.get('ui.quickbar', '', 'open'),
    header: ls.get('ui.header', '', ''),
    body: ls.get('ui.body', '', '')
  },
  currency: ls.get('currency', '', '€'),
  currencys: {
    list: {
      '€': {
        symbole: '€',
        name: 'Euro',
        tx: {
          '€': 1,
          '$': 1.06957,
          '£': 0.854353965
        }
      },
      '$': {
        symbole: '$',
        name: 'Dollar',
        tx: {
          '€': 1,
          '$': 1,
          '£': 1
        }
      },
      '£': {
        symbole: '£',
        name: 'Livre Sterling',
        tx: {
          '€': 1,
          '$': 1,
          '£': 1
        }
      }
    }
  },
  urls: {
    service: 'http://service.rodbox.fr/web/api',
    cloud: 'http://192.168.1.45/__cloud_service__/web/',
    upload: 'http://192.168.1.45/__cloud_service__/web/upload',
    spacer: 'http://192.168.1.81/__cdn_rodbox__/img/spacer.png',
    users: 'http://192.168.1.81/__cdn_rodbox__/users',
    cdn: 'http://192.168.1.81/__cdn_rodbox__',
    sh: 'http://192.168.1.45/__cdn__/sh.php'
  }
}

const mutations = {
  LOAD_ON (state) {
    state.loader = true
  },
  LOAD_OFF (state) {
    state.loader = false
  },
  LOAD_TOGGLE (state) {
    state.loader = !state.loader
  },
  FORCE (state, bool) {
    state.force = bool
  },
  CURRENCY (state, currency) {
    ls.set('currency', currency)
    state.currency = currency
  },
  UI (state, config) {
    state.ui[config.index] = config.value
  },
  UI_TOGGLE (state, config) {
    let value = (state.ui[config.index] === config.values[0]) ? config.values[1] : config.values[0]
    state.ui[config.index] = ls.set('ui.' + config.index, value)
  }
}

const getters = {
  title: state => state.title,
  loader: state => state.loader,
  cdn: state => state.urls.cdn,
  urls: state => state.urls,
  force: state => state.force,
  currency: state => state.currency,
  currencys: state => state.currencys,
  headerCss: state => state.headerCss,
  ui: state => state.ui,
  header: state => state.ui.header,
  quickbar: state => state.ui.quickbar
}

const actions = {
  updLocale: (store, locale) => {
    store.commit('UPD_LOCALE', locale)
  },
  loadOn: (store) => {
    store.commit('LOAD_ON')
  },
  setForce: (store, bool) => {
    store.commit('FORCE', bool)
  },
  loadOff: (store) => {
    store.commit('LOAD_OFF')
  },
  loadToggle: (store) => {
    store.commit('LOAD_TOGGLE')
  },
  setCacheService: (store, service, json) => {
    let cacheIndex = 'service.cache.' + service.name + '.' + service.id
    let cacheIndexLoaded = cacheIndex + '.loaded'
    let cacheIndexCache = cacheIndex + '.cache'
    ls.set(cacheIndexLoaded, 'bool', true)
    return ls.set(cacheIndexCache, 'json', json)
  },
  getCacheService: (store, service) => {
    let cacheIndex = 'service.cache.' + service.name + '.' + service.id
    let cacheIndexLoaded = cacheIndex + '.loaded'
    let cacheIndexCache = cacheIndex + '.cache'
    let loaded = ls.get(cacheIndexLoaded, 'bool', false)
    if (loaded) {
      let cache = ls.get(cacheIndexCache, 'json', {})
      if (_.isFunction(service.callback)) {
        service.callback(cache.data, cache.content)
      }
      return false
    }
    return true
  },
  setCurrency ({store, commit, rootState}, currency) {
    commit('CURRENCY', currency)
  },
  checkMessage ({store, commit, rootState}, index) {
    commit('MESSAGE', index)
  },
  setHeaderCss ({commit}, css) {
    commit('UI', css)
  },
  addUi ({commit}, config) {
    $(config.index).addClass(config.value)
  },
  removeUi ({commit}, config) {
    $(config.index).removeClass(config.value)
  },
  setUi ({commit}, config) {
    commit('UI', config)
  },
  uiToggle ({state, store, commit}, config) {
    commit('UI_TOGGLE', config)
  },
  getService: (store, service) => {
    /* if (service.cache !== undefined && service.cache) {
      store.dispatch('getCacheService', service)
    } */
    if (_.isFunction(service.beforeSend)) {
      service.beforeSend()
    }
    let data = {
      k: store.state.key,
      s: service.name,
      c: {
        n: navigator.userAgent,
        os: navigator.platform,
        t: Date.now(),
        u: window.store.state.userModule.user,
        s: {
          h: window.screen.height,
          w: window.screen.width
        }
      },
      data: service.dataSend
    }
    if (service.hook !== undefined || service.hook !== null || service.hook !== false) {
      data['hook'] = service.hook
    }
    store.dispatch('loadOn')
    $.ajax({
      url: store.state.urls.service,
      data,
      dataType: 'JSON',
      async: true,
      crossDomain: true,
      type: 'post',
      success (json) {
        /* if (service.cache !== undefined && service.cache) {
          return store.dispatch('setCacheService', service, json)
        } */
        if (_.isFunction(service.callback)) {
          service.callback(json.data, json.content)
        }
      },
      error () {
        window.dialog = bootbox.dialog({
          size: 'small',
          message: '<span class="text-center">' + translate('msg.error') + '</span>',
          closeButton: true
        })
        if (_.isFunction(service.error)) {
          service.error()
        }
      },
      complete () {
        if (_.isFunction(service.complete)) {
          service.complete()
        }
        store.dispatch('loadOff')
      },
      isObject (prop) {
        return typeof prop === 'object'
      }
    })
  }
}

import { modules } from './modules.js'

export const store = window.store = new Vuex.Store({
  modules,
  state,
  mutations,
  getters,
  actions,
  strict: false,
  namespaced: true
})
