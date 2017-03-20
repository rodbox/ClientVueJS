<template>
  <span class="user-identity">
    <user :user="user"></user>
    <span class="username">{{user.firstname}} {{user.lastname}}</span>
  </span>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'userIdentity',
    props: {
      user: {type: Object, default: {}}
    },
    computed: {
      ...mapGetters(['urls'])
    },
    methods: {
      ...mapActions('usersModule', ['serverScan']),
      ...mapActions('messageModule', ['sendModal']),
      scan (username) {
        window.store.dispatch('usersModule/serverScan', {
          username
        })
      },
      sendPreset (user) {
      }
    }
  }
</script>
<style lang="less">
.user-identity{

}
</style>
