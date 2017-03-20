import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
  name: 'home',
  path: '/',
  title: 'home',
  components: {
    default: require('./pages/Hello.vue')
  }
}, {
  name: 'user',
  title: 'user',
  path: '/user',
  components: {
    default: require('./pages/UserSetting.vue')
  }
}, {
  name: 'admin_user',
  title: 'admin_user',
  path: '/admin',
  components: {
    default: require('./pages/UserAdmin.vue')
  }
}, {
  name: 'blog',
  title: 'blog',
  path: '/blog/:id',
  components: {
    default: require('./components/Blog/Blog.vue')
  }
}, {
  name: 'test',
  path: '/test',
  components: {
    modal: require('./pages/Test.vue')
  }
}, {
  name: 'register',
  path: '/register',
  components: {
    default: require('./pages/UserRegister.vue')
  }
}, {
  name: 'login',
  path: '/login',
  components: {
    default: require('./pages/UserLogin.vue')
  }
}, {
  name: 'users',
  path: '/users',
  components: {
    default: require('./pages/Users.vue')
  }
}, {
  name: 'paper',
  path: '/paper',
  components: {
    default: require('./components/Plugins/vpaper/vPaper.vue')
  }
}, {
  name: 'slug',
  title: 'slug',
  path: '/:slug',
  components: {
    default: require('./pages/Slug.vue')
  }
}, {
  name: 'index_user',
  title: 'index_user',
  path: '/:username',
  components: {
    default: require('./pages/UserIndex.vue')
  }
}, {
  name: '404',
  path: '*',
  components: {
    default: require('./pages/notFound.vue')
  }
}]

const router = new VueRouter({
  mode: 'history',
  beforeEach: () => (to, from, next) => {
    window.store.dispatch('setHeaderCss', '')
  },
  afterEach: () => (to, from) => {
  },
  routes
})

window.router = router

export default router
