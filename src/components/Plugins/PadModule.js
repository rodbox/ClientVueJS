const state = {
  current: {
    id: '0123',
    tags: []
  },
  selecteds: ['0123', '4231', '2314', '5341'],
  service: 'product'
}

const mutations = {
}

const getters = {
  current (state) { return state.current },
  selecteds (state) { return state.selecteds },
  service (state) { return state.service }
}

const actions = {
  getItemtags ({store, state, commit, rootState}, config) {
    window.store.dispatch('getService', {
      id: config.service,
      name: 'tags.itemTags',
      cache: true,
      dataSend: config,
      callback (json) {
      },
      beforeSend () {
      }
    })
  },
  setTag ({store, state, commit, rootState}, config) {
    // RB Service : placeholder.load
    window.store.dispatch('getService', {
      id: state.service,
      name: 'tags.set',
      cache: true,
      dataSend: config,
      hook: ['trace'],
      callback (json) {
      },
      beforeSend () {
      }
    })
  },
  setMode (bool) {
  }
}

export const padModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
