const state = {
}

const mutations = {
}

const getters = {
}

const actions = {
  getContent ({store, state, commit, rootState}, slug) {
    // RB Service : placeholder.load
    window.store.dispatch('getService', {
      id: 'slug',
      name: 'slug.load',
      cache: true,
      dataSend: {
        slug
      },
      hook: [''],
      callback (json) {
      },
      beforeSend () {
      }
    })
  },
  setMode (bool) {
  }
}

export const vslugModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
