<template>
 <div class="card col-4">
  <div class="card-block text-center" :style="'background-color:' + post.meta.bgcolor + '; color:' + post.meta.color" >
      <router-link :to="{name: 'blog', params: {id: post.id}}" :style="'color:' + post.meta.color">
      <h1>{{post.title}}</h1>
      <span class="text-sm">{{post.dateCreate.timestamp|fromNow(true)}}</span>
      </router-link>
      <hr>
      <span class="text-sm">{{"label.by"|trans}} : </span><user-identity :user="post.author"></user-identity>
      <hr>
      <button class="btn btn-sm btn-inverse" @click.prevent="setEdit(post)"><i class="fa fa-pencil"></i></button>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BlogPostPreview',
    props: {
      post: {type: Object, default: {}}
    },
    computed: {
      ...mapGetters('blogModule', [''])
    },
    methods: {
      ...mapActions('blogModule', ['setEdit'])
    }
  }
</script>