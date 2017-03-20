const state = {
  finder: ''
}

const mutations = {
  FORM: (state, finder) => {
    state.finder = finder
  }
}

const getters = {
  finder (state) { return state.finder }
}

const actions = {
  addTrans ({state, commit, rootState}) {
    // RB Service : user.login
    window.store.dispatch('getService', {
      name: 'trans.add',
      dataSend: {
        value: state.finder,
        locale: window.store.getters['localeModule/locale']
      },
      callback: (json) => {
      },
      beforeSend: () => {
      }
    })
  }
}

export const devModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
