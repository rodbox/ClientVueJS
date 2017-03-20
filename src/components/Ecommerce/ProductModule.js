const state = {
}

const mutations = {
}

const getters = {
}

const actions = {
  productCreate ({store, commit}, item) {
    // RB Service :  placeholder.update
    window.store.dispatch('getService', {
      id: 'placeholder.create',
      name: ' placeholder.create',
      cache: true,
      dataSend: {
        item
      },
      callback (json) {
        console.log('placeholder.create callback', json)
      },
      beforeSend () {
        console.log('placeholder.create beforeSend')
      }
    })
  },
  productUpdate ({store, commit}, item) {
    // RB Service :  placeholder.update
    window.store.dispatch('getService', {
      id: 'placeholder.update',
      name: ' placeholder.update',
      cache: true,
      dataSend: {
        item
      },
      callback (json) {
        console.log('placeholder.update callback', json)
      },
      beforeSend () {
        console.log('placeholder.update beforeSend')
      }
    })
  }
}

export const productModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
