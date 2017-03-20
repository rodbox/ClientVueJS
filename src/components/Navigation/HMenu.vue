<template>
  <header class="fixed-top" :class="headerCss">
    <nav class="navbar navbar-inverse navbar-toggleable-sm ">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link :to="{name: 'home'}" class="navbar-brand">{{title}}</router-link>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <form class="form-inline  my-2 my-lg-0 form-finder" :class="focus" @submit.prevent="find">
          <div class="input-group mr-sm-2 " >
            <div class="input-group-addon"><i class="fa fa-search"></i></div>
            <input class="form-control" @focus="setFocus('focus')" @blur="setFocus('')" type="text" v-model="finder">
          </div>
        </form>
        <UserMenu class=" my-2 my-lg-0 navbar-nav pull-xs-right"></UserMenu>
      </div>
      <loader class="loader-master" color="#fff"></loader>
    </nav>
  </header>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'HMenu',
    data () {
      return {
        finder: '',
        focus: ''
      }
    },
    components: {
      UserMenu: require('../User/UserMenu')
    },
    methods: {
      ...mapActions('localeModule', ['setLocale']),
      find () {
        this.$store.commit('devModule/FORM', this.finder)
        window.store.dispatch('devModule/addTrans')
        this.finder = ''
      },
      setFocus (css) {
        this.focus = css
      }
    },
    computed: {
      ...mapGetters(['title', 'headerCss']),
      ...mapGetters('userModule', ['connected', 'user']),
      ...mapGetters('localeModule', ['locales', 'locale'])
    }
  }
</script>
<style lang="less">
  .navbar-toggleable-sm{
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
</style>