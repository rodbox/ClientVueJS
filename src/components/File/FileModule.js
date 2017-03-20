const state = {
  dir: 'cdn',
  index: '/',
  breads: [],
  files: [
    {
      name: 'toto.txt',
      ext: 'txt',
      path: '/'
    }
  ],
  icons: {
    txt: {css: 'fa fa-file-word-o', color: '#196ca7'},
    md: {css: 'fa fa-file-word-o', color: '#196ca7'},
    json: {css: 'fa fa-file-code-o', color: '#136055'},
    csv: {css: 'fa fa-file-excel-o', color: '#27a877'},
    xls: {css: 'fa fa-file-excel-o', color: '#27a877'},
    xlsx: {css: 'fa fa-file-excel-o', color: '#27a877'},
    avi: {css: 'fa fa-movie', color: '#4e2472'},
    mpg: {css: 'fa fa-movie', color: '#4e2472'},
    mp3: {css: 'fa fa-file-audio-o', color: '#f39c12'},
    wav: {css: 'fa fa-file-audio-o', color: '#f39c12'},
    mp4: {css: 'fa fa-file-audio-o', color: '#f39c12'},
    flac: {css: 'fa fa-file-audio-o', color: '#f39c12'}
  }
}

const mutations = {
  FILES (state, files) {
    state.files = files
  }
}

const getters = {
  files (state, getters, rootState) { return state.files },
  icons (state, getters, rootState) { return state.icons }
}

const actions = {
  getColor ({state, commit, rootState}, ext) {
    return state.icons[ext]['color']
  },
  getCss ({state, commit, rootState}, ext) {
    return state.icons[ext]['css']
  },
  getFiles ({state, commit, rootState}, data) {
    // RB Service : user.login
    window.store.dispatch('getService', {
      name: 'files.scan',
      dataSend: {
        'dir': data.dir,
        'index': data.index
      },
      callback: (json) => {
        commit('FILES', json)
      },
      beforeSend: () => {
      }
    })
  },
  addMagic ({state, commit, rootState}, data) {
  },
  removeMagic ({state, commit, rootState}, data) {
  }
}

export const fileModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
