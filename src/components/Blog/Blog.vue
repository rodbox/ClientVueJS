<template>
<div>
  <blog-post :post="show"></blog-post>
</div>
</template>
<script>
  // const compiler = require('vue-template-compiler')
  import { mapGetters, mapActions } from 'vuex'
  import blogPost from './BlogPost.vue'
  export default {
    name: 'Blog',
    components: { blogPost },
    computed: {
      ...mapGetters('blogModule', ['currency', 'show']),
      ...mapGetters(['currency'])
    },
    methods: {
      ...mapActions(['addUi']),
      ...mapActions('blogModule', ['getPost'])
    },
    mounted () {
      this.getPost(this.$route.params.id)
    }
  }
</script>
<style lang="less">

</style>