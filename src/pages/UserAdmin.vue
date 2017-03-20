<template>
<div>
  <blog-admin></blog-admin>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import BlogAdmin from '../components/Blog/BlogAdmin.vue'
  export default {
    name: 'User',
    components: { BlogAdmin },
    computed: {
      ...mapGetters(['urls']),
      ...mapGetters('usersModule', ['users']),
      ...mapGetters('userModule', ['user']),
      ...mapGetters('indexModule', ['meta'])
    },
    methods: {
      ...mapActions(['addUi']),
      ...mapActions('usersModule', ['all']),
      ...mapActions('indexModule', ['loadIndex']),
      rgba (h, opacity) {
        function hexToR (h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
        function hexToG (h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
        function hexToB (h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
        function cutHex (h) { return (h.charAt(0) === '#') ? h.substring(1, 7) : h }

        return 'rgba(' + hexToR(h) + ',' + hexToG(h) + ',' + hexToB(h) + ',' + opacity + ')'
      }
    },
    created () {
      this.addUi({index: 'body', value: 'header-dark'})
      this.loadIndex(this.user.username)
    }
  }
</script>
