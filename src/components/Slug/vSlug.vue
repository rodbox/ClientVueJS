<template>
<div>
  slug loader : 
  {{slug}}
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'vSlug',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters('slugModule', [''])
    },
    props: {
      slug: {type: String, default: 'home-index'}
    },
    methods: {
      ...mapActions('slugModule', ['getContent'])
    },
    mounted () {

      // this.getContent(this.slug)
    }
  }
</script>
<style lang="less">
</style>
