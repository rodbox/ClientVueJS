<template>
    <div class="btn-group">
      <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="nav-link">
      {{locale.current}} <i class="fa fa-angle-down"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
          <a href="#" class="dropdown-item" v-for="locale in locale.locales">{{locale}}</a>
      </div>
  </div>
</template>

<script>
  import AppStore from '../../AppStore'
  import vuex from 'vuex'
  let getters = vuex.mapGetters(['locales'])
  export default {
    name: 'LocaleMenu',
    store: AppStore,
    data () {
      return AppStore.state
    },
    computed: {

    }
  }
</script>

<style lang="less">
</style>