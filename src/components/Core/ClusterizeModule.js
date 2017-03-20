import { ls } from './localstorage.js'
import _ from 'lodash'
import $ from 'jquery'
// import Vue from 'vue'
// import { mapGetters, mapActions } from 'vuex'

const state = {
  finder: {
    strict: false,
    value: '',
    reg: '',
    index: ['name']
  },
  toggle: false,
  cur: ls.get('clusterizeModule.cur', '', 1),
  pages: ls.get('clusterizeModule.cur', 'int', 1),
  per: ls.get('clusterizeModule.per', '', 20),
  pers: ls.get('clusterizeModule.pers', 'json', [5, 10, 20, 40, 100, 250]),
  type: ls.get('clusterizeModule.type', '', 'Batterie'),
  filetype: 'json',
  focus: -1,
  onload: false,
  autoclear: true,
  autonext: false,
  autoclose: true,
  checked: [],
  counterChecked: 0,
  placeholder: ls.get('clusterizeModule.placeholder', 'json', {
    meta: {},
    filters: {},
    items: {}
  }),
  itemsFilters: {},
  templates: ls.get('clusterizeModule.templates', 'json', {}),
  order: ls.get('clusterizeModule.order', 'json', ['id', true]),
  items: ls.get('clusterizeModule.items', 'json', {}),
  itemFocus: {},
  itemsFiltred: ls.get('clusterizeModule.itemsFiltred', 'json', {}),
  itemsChecked: ls.get('clusterizeModule.itemsChecked', 'json', {}),
  itemsFinded: ls.get('clusterizeModule.itemsFinded', 'json', {}),
  itemsOrdered: ls.get('clusterizeModule.itemsOrdered', 'json', {}),
  itemsPaginate: ls.get('clusterizeModule.itemsPaginate', 'json', {}),
  edit: {},
  formadd: {},
  show: {},
  loaded: ls.get('clusterizeModule.loaded', 'bool', 'false')
}

const mutations = {
  FORMADD (state, data) {
    state.formadd[data.index] = data.value
  },
  LOADED (state, loaded) {
    state.loaded = ls.set('clusterizeModule.loaded', loaded)
  },
  FOCUS (state, focus) {
    state.focus = ls.set('clusterizeModule.focus', focus)
    state.itemFocus = state.itemsPaginate[state.focus]
  },
  AUTOCLEAR (state, bool) {
    state.autoclear = ls.set('clusterizeModule.autoclear', bool)
  },
  AUTONEXT (state, bool) {
    state.autonext = ls.set('clusterizeModule.autonext', bool)
  },
  AUTOCLOSE (state, bool) {
    state.autoclose = ls.set('clusterizeModule.autoclose', bool)
  },
  ONLOAD (state, bool) {
    state.onload = bool
  },
  CHECKED (state, item) {
    let checkeds = state.checked
    if (item.check) {
      checkeds.push(item.id)
    } else {
      checkeds = _.remove(checkeds, (n) => {
        return n !== item.id
      })
    }
  },
  COUNTERCHECKED (state) {
    let checked = _.filter(state.itemsPaginate, {check: true})
    state.itemsChecked = checked
    state.counterChecked = Object.keys(checked).length
  },
  CLEARFILTERS (state) {
    state.itemsFilters = {}
  },
  ITEMSFILTERS (state, filter) {
    /**
    * TODO : fix filter show index selected
    **/
    if (filter.value === '' || filter.value === '*') {
      state.itemsFilters = _.omit(state.itemsFilters, filter.type)
    } else {
      state.itemsFilters[filter.type] = filter.value
      state.itemsFilters = state.itemsFilters
    }
  },
  PLACEHOLDER (state, placeholder) {
    state.placeholder = ls.set('clusterizeModule.placeholder', placeholder)
  },
  TYPE (state, type) {
    state.type = ls.set('clusterizeModule.type', type)
  },
  ITEMSSORTEDS (state) {
    let sensString = state.order[1] ? 'asc' : 'desc'
    state.itemsOrdered = _.orderBy(state.itemsFinded, [state.order[0]], [sensString])
  },
  ORDERED (state, order) {
    let sens = (order === state.order[0]) ? !state.order[1] : true
    state.order = ls.set('clusterizeModule.order', [order, sens])
  },
  PER (state, per) {
    state.per = ls.set('clusterizeModule.per', per)
  },
  PAGES (state) {
    if (state.per !== '' && state.per !== '*') {
      let pages = Math.ceil(Object.keys(state.itemsFinded).length / state.per)
      state.pages = ls.set('clusterizeModule.pages', pages)
    } else {
      let pages = 1
      state.pages = ls.set('clusterizeModule.pages', pages)
    }
  },
  CUR (state, cur) {
    if (cur > 0 && cur <= state.pages) {
      state.cur = ls.set('clusterizeModule.cur', cur)
    }
  },
  ITEMS (state, items) {
    state.items = ls.set('clusterizeModule.items', items)
  },
  PAGINATES (state, items) {
    if (state.per !== '' && state.per !== '*') {
      let last = state.cur * state.per
      let first = last - state.per
      let paginate = _.slice(state.itemsOrdered, first, last)
      state.itemsPaginate = ls.set('clusterizeModule.itemsPaginate', paginate)
    } else {
      state.itemsPaginate = ls.set('clusterizeModule.itemsPaginate', state.itemsOrdered)
    }
  },
  FILTREDS (state) {
    state.itemsFiltred = _.filter(state.items, state.itemsFilters)
  },
  FINDEDS (state) {
    /* eslint-disable  */
    if (state.finder.value.length > 0) {
      let reg = ''
      let regexp = '[a-zA-Z0-9\\.\.\\s\_\-]{0,}'
      for (let i = 0; i < state.finder.value.length; i++) reg = reg + state.finder.value[i] + '{1}(' + regexp + ')';
      state.finder.reg = reg
      let finded = _.filter(state.itemsFiltred, (item) => {
        return item.name.match(new RegExp(reg, 'i'))
      })
      state.itemsFinded = finded
    } else {
      state.itemsFinded = state.itemsFiltred
    }
  },
  EDIT (state, item) {
    state.edit = item
  },
  SHOW (state, item) {
    state.show = item
  },
  FINDER (state, finder) {
    /* eslint-disable  */
    state.finder.value = finder
  },
  TEMPLATES (state) {
    let templates = _.filter(state.placeholder.table.cols, (col) => {
        return col.tpl !== ''
    })
    state.templates = templates
    let tpls = {}
    _.forEach(templates, (element, index) => {
      tpls[element.id] = element.tpl
    })
    state.templates = ls.set('clusterizeModule.templates', tpls)
  }
}

const getters = {
  cur (state) { return state.cur },
  per (state) { return state.per },
  focus (state) { return state.focus },
  checked (state) { return state.checked },
  cols (state) { return state.placeholder.table.cols },
  type (state) { return state.type },
  pers (state) { return state.pers },
  edit (state) { return state.edit },
  meta (state) { return state.placeholder.meta },
  pages (state) { return state.pages },
  items (state) { return state.items },
  order (state) { return state.order },
  onload (state) { return state.onload },
  loaded (state) { return state.loaded },
  finder (state) { return state.finder },
  formadd (state) { return state.formadd },
  bgorder ({state}, index) { return 'index-order' },
  filters (state) { return state.placeholder.filters },
  autonext (state) { return state.autonext },
  autoclear (state) { return state.autoclear },
  autoclose (state) { return state.autoclose },
  templates (state) { return state.templates },
  itemsFilters (state) { return state.itemsFilters },
  itemsFiltred (state) { return state.itemsFiltred },
  itemsFinded (state) { return state.itemsFinded },
  itemsOrdereds (state) { return state.itemsOrdereds },
  itemsPaginate (state) { return state.itemsPaginate },
  itemsOrdered (state) { return state.itemsOrdered },
  checkeds (state) { 
    let checked = _.filter(state.itemsPaginate, {check: true}) 
    return _.map(checked, 'id')
  },
  itemsChecked (state) { return _.filter(state.itemsPaginate, {check: true}) },
  itemsOrdered (state) { return state.itemsOrdered },
  itemFocus (state) { return state.itemFocus },
  counterChecked (state) { return state.counterChecked },
  counterFilter (state) { return Object.keys(state.itemsFiltred).length },
  counterFinded (state) { return Object.keys(state.itemsFinded).length },
  counter (state) { return Object.keys(state.placeholder.items).length }
}

const actions = {
  updForm ({state, commit}, data) {
    commit('FORMADD', data)
  },
  setFilter ({state, commit, rootState}, filter) {
    commit('ITEMSFILTERS', filter)
    commit('FILTREDS')
    commit('FINDEDS')
    commit('ITEMSSORTEDS')
    commit('PAGES')
    commit('PAGINATES')
    commit('CUR', 1)
  },
  setClearFilter ({state, commit, rootState}) {
    commit('CLEARFILTERS')
    commit('FINDER', '')
    commit('FILTREDS')
    commit('FINDEDS')
    commit('ITEMSSORTEDS')
    commit('PAGES')
    commit('PAGINATES')
    commit('CUR', 1)
  },
  setPer ({state, commit, rootState}, per) {
    commit('CUR', 1)
    commit('PER', per)
    commit('PAGES')
    commit('PAGINATES')
  },
  setCur ({state, commit, rootState}, cur) {
    commit('CUR', cur)
    commit('PAGINATES')
  },
  setOrder ({state, commit, rootState}, index) {
    commit('ORDERED', index)
    commit('ITEMSSORTEDS')
    commit('PAGINATES')
  },
  navCur ({state, commit, rootState}, inc) {
    let cur = parseInt(state.cur) + parseInt(inc)
    commit('CUR', cur)
    commit('PAGINATES')
  },
  setDataService ({store, state, commit, rootState}, config) {
    // RB Service : placeholder.load
    window.store.dispatch('getService', {
      id: config.service,
      name: config.service + '.load',
      cache: true,
      dataSend: {
        name: config.service
      },
      callback (json) {
        commit('PLACEHOLDER', json)
        commit('LOADED', true)
        commit('ITEMS', json.items)
        commit('PAGES')
        commit('FILTREDS')
        commit('FINDEDS')
        commit('ITEMSSORTEDS')
        commit('CUR', 1)
        commit('PAGES')
        commit('PAGINATES')
        commit('TEMPLATES')
      },
      beforeSend () {
      }
    })
  },
  setEdit ({state, commit, rootState}, item) {
    commit('EDIT', item)
  },
  saveEdit ({state, commit, rootState}, config) {
    // RB Service : placeholder.load
    window.store.dispatch('getService', {
      id: config.service,
      name: config.service + '.save',
      cache: true,
      dataSend: {
        crud: config.crud,
        service: config.service,
        edit: config.edit
      },
      callback (json) {
        if(config.crud) {
          if(state.autonext) {
            alert('next')
          } else if(state.autoclose) {
            $('#edit').modal('hide')
          } else {}
        } else {
          if(state.autoclear) {
            alert('clear')
          }
        }
        commit('ONLOAD', false)
      },
      beforeSend () {
        commit('ONLOAD', true)
      }
    })
  },
  setShow ({state, commit, rootState}, item) {
    commit('SHOW', item)
  },
  setSearch ({state, commit, rootState}, finder) {
    commit('FINDER', finder)
    commit('FINDEDS')
    commit('ITEMSSORTEDS')
    commit('CUR', 1)
    commit('PAGES')
    commit('PAGINATES')
  },
  bgOrder ({state, commit, rootState}, index) {
    return (index === state.order[0]) ? 'index-order' : ''
  },
  setFocus ({state, commit, rootState}, focus) {
    commit('FOCUS', focus)
  },
  navFocus ({state, commit, rootState}, inc) {
    // console.log('focus')
    let focusIndex = state.focus + inc
    if (focusIndex < 0) {
      focusIndex = 0
    } else if (focusIndex >= state.per - 1) {
      focusIndex = state.per - 1
    }
    commit('FOCUS', focusIndex)
  },
  extractFocus ({state}) {
    let focused = state.itemsPaginate[state.focus]
    console.log(focused)
  },
  toggleCheck ({state, commit, rootState}, index) {
    commit('PAGINATES')
    commit('COUNTERCHECKED')
  },
  toggleCheckAll ({state, commit, rootState}, bool) {
    let items = state.itemsPaginate
    state.toggle = !state.toggle
    _.map(items, (item) => {
      item.check = state.toggle
      return item
    })
    commit('COUNTERCHECKED')
    commit('PAGINATES')
  },
  toggleCheckFocus ({state, commit, rootState}) {
    let item = state.itemsPaginate[state.focus]
    item.check = !item.check
    commit('CHECKED', item)
    commit('COUNTERCHECKED')
    commit('PAGINATES')
  },
  editFocus ({state, commit, rootState}) {
    let focusIndex = state.focus
    let item = state.itemsPaginate[state.focus]
    commit('EDIT', item)
    let modal = $('.modal#edit')
    modal.find('.modal-title .title').html(state.edit.name)
    modal.find('.modal-title .subtitle').html(state.edit.brand)
    modal.find('.modal-title .righttitle').html(state.edit.id)

    if (!$('body').hasClass('modal-open')) {
      modal.modal({
        backdrop: 'static'
      }).on('hidden.bs.modal', (event) => {
        $('.cluster-finder').focus()
        commit('FOCUS', focusIndex)
      }).on('show.bs.modal', (event) => {
        $('select').trigger('change')
        $('#edit .form-control').first().focus()
      })
    }
  },
  setEditNav({state, commit, dispatch}, inc) {
    dispatch('navFocus', inc)
    dispatch('editFocus')
  },
  updForm ({state, commit}, e) {
    state.formadd[e.target.name] = e.target.value
  },
  addIndexEdit ({state, commit}, e) {
    if (state.formadd[e.target.name] != '') {
      state.edit[e.target.name].push(state.formadd[e.target.name])
      state.formadd[e.target.name] = ''
    }
  },
  delIndexEdit ({state, commit}, index, k) {
    if(confirm('Supprimer')){
      state.edit[index].splice(k, 1);
    }
  },
  updIndexEdit ({state, commit, event}, index, value) {
  },
  exportSelect ({state, store}, service) {
    let data = state.itemsChecked
    let date = new Date ()
    let dataname = date.getFullYear()+'_'+(date.getMonth()+1)+'_'+date.getDate()+'__'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()

    /* source : http://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser */
    if(!data) {
        console.error('No data')
        return;
    }

    let filename = service + '_' + dataname + '.' + state.filetype
    if (state.filetype === 'json') {
      if(typeof data === "object"){
          data = JSON.stringify(data, undefined, 4)
      }

      var blob = new Blob([data], {type: 'text/json'}),
          e    = document.createEvent('MouseEvents'),
          a    = document.createElement('a')
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    } else {
        var csvContent = "data:text/csv;charset=utf-8,"
        
        console.log(data.join(","))
        /* var blob = new Blob([csvContent], {type: 'text/csv'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/csv', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e) */
    }
  }
}

export const clusterizeModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
