<template>
 <div>
 <div class="row">
<div class="form-group col-2">
  <label for="">bgcolor</label>
  <input type="color" class="form-control" :style="'background-color:' + post.meta.bgcolor" v-model="post.meta.bgcolor">
  <input type="text" class="form-control" :style="'background-color:' + post.meta.bgcolor" v-model="post.meta.bgcolor">
</div>
<div class="form-group col-2">
  <label for="">color</label>
  <input type="color" class="form-control" style="'background-color:' + post.meta.color" v-model="post.meta.color">
  <input type="text" class="form-control" :style="'background-color:' + post.meta.color" v-model="post.meta.color">
</div>
<div class="form-group col-2">
  <label for="">bgcoloralpha</label>
  <input type="range" class="form-control"v-model="post.meta.bgalpha">
</div>
</div>
<hr>
<div class="row">
  <blog-post :post="edit"></blog-post>
</div>
</div>
</template>
<script>
  // const compiler = require('vue-template-compiler')
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BlogPostSetting',
    props: {
      post: {type: Object, default: {}}
    },
    data () {
    },
    components: {
    },
    computed: {
      ...mapGetters('blogModule', [''])
    },
    methods: {
      ...mapActions('blogModule', [''])
    },
    mounted () {
    }
  }
</script>
<style lang="less">
</style>