import { ls } from '../Core/localstorage.js'
/* import _ from 'lodash'
import $ from 'jquery' */

const state = {
  edit: {},
  show: {},
  list: ls.get('blog.all', 'json', {})
}

const mutations = {
  EDIT (state, post) {
    state.edit = post
  },
  SHOW (state, post) {
    state.show = post
  },
  SET (state, data) {
    state.edit[data.index] = data.value
  },
  ALL (state, list) {
    state.list = ls.set('blog.all', list)
  }
}

const getters = {
  edit (state) { return state.edit },
  list (state) { return state.list },
  show (state) { return state.show }
}

const actions = {
  setEdit ({state, commit, rootState}, item) {
    commit('EDIT', item)
  },
  getPost ({state, commit}, id) {
    window.store.dispatch('getService', {
      id: 'blog',
      name: 'blog.get',
      cache: true,
      dataSend: {
        id
      },
      callback (json) {
        commit('SHOW', json)
      },
      beforeSend () {
      }
    })
  },
  all ({state, commit, rootState}, config) {
    window.store.dispatch('getService', {
      id: 'blog',
      name: 'blog.all',
      cache: true,
      dataSend: {
        r: false
      },
      callback (json) {
        commit('ALL', json)
      },
      beforeSend () {
      }
    })
  },
  savePost ({state, commit, rootState}, config) {
    window.store.dispatch('getService', {
      id: config.service,
      name: config.service + '.save',
      cache: true,
      dataSend: {
        add: config.type,
        service: config.service,
        edit: config.edit,
        lang: config.lang
      },
      callback (json) {
      },
      beforeSend () {
      }
    })
  },
  blogService ({state, commit, rootState}, config) {
    // RB Service : placeholder.load
    /* window.store.dispatch('getService', {
      id: config.service,
      name: config.service + '.save',
      cache: true,
      dataSend: {
        crud: config.crud,
        service: config.service,
        edit: config.edit
      },
      callback (json) {
      },
      beforeSend () {
      }
    }) */
  }
}

export const blogModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
