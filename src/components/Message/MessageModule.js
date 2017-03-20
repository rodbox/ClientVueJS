import { ls } from '../Core/localstorage.js'
import $ from 'jquery'
const state = {
  types: ['sms', 'mail', 'note'],
  note: {
    contact: [''],
    message: ''
  },
  sms: {
    contact: [''],
    message: ''
  },
  mail: {
    contact: [''],
    object: '',
    message: ''
  }
}

const mutations = {
}

const getters = {
  types (state) { return state.types },
  note (state) { return state.note },
  sms (state) { return state.sms },
  mail (state) { return state.mail }
}

const actions = {
  sendSms ({state, commit, rootState}, config) {
    console.log(ls)
    window.store.dispatch('getService', {
      name: 'sms.send',
      dataSend: state.sms,
      callback: (json) => {
      },
      beforeSend: () => {
      }
    })
  },
  sendNote ({state, commit, rootState}, config) {
    window.store.dispatch('getService', {
      name: 'note.send',
      dataSend: state.note,
      callback: (json) => {
      },
      beforeSend: () => {
      }
    })
  },
  sendMail ({state, commit, rootState}, config) {
    window.store.dispatch('getService', {
      name: 'mails.send',
      dataSend: state.mail,
      callback: (json) => {
      },
      beforeSend: () => {
      }
    })
  },
  sendModal ({state}, user) {
    $('#sendMsg .title').html('Envoyer un message : ' + user.username)
    $('#sendMsg').modal()
  }
}

export const messageModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
