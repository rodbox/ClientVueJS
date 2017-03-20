<template>
 <div class="blog-post">
  <div class="blog-post-header-container">
    <div class="blog-post-header text-center" :style="'background-color:' + post.meta.bgcolor + '; color:' + post.meta.color">
      <h1>{{post.title}}</h1>
      <div class="divider">...</div>
      <user-identity :user="post.author"></user-identity>
      <div>
        <span class="text-sm">{{post.dateCreate.timestamp|fromNow(true)}}</span>
      </div>
    </div>
  </div>
  <div class="container">
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="blog-post-content" v-html="post.content"></div>
        <div class="blog-post-footer" >
          <hr>
          <user-identity :user="post.author"></user-identity>
        </div>
      </div><div class="col-md-2">
        <b-tag-button v-for="tag in post.meta.tags" :tag="tag" limit=false></b-tag-button>
      </div>
  </div>
  </div>
</div>
</template>
<script>
  // const compiler = require('vue-template-compiler')
  import $ from 'jquery'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BlogPost',
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
      $('.blog-post-content table').addClass('table table-sm')
      $('.blog-post-content pre').addClass('codemirror')
    }
  }
</script>
<style lang="less">
.blog-post {
  background-color: #fff;
  .blog-post-footer {
    padding:1rem;
  }
  h1{
    font-weight: 600;
    font-size: 2rem;
    font-weight: 700;
  }
  .blog-post-header-container{
    .divider{
      height: 3px;
      margin-bottom: 2rem;
    }
    .blog-post-header{
    h1{
      margin: 0;
      font-size: 2.5rem;
      text-align: center;
    }
      padding:4rem  1rem ;
    }
  }
  .blog-post-content{
    h1{
      margin-top: 1rem;
    }
    padding: 2rem;
  }
}
</style>