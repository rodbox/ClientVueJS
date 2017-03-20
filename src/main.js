// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'select2/dist/css/select2.min.css'

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import router from './router.js'
import { store } from './store.js'

/* eslint-disable  */
import compo from './components.js'

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

require('./filter.js')
require('tether')

Vue.config.debug = true

import $ from 'jquery'
window.jQuery = window.$ = $
require('bootstrap')
require('brace')



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(require('./App'))
})
