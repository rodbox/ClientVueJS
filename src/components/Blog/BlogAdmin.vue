<template>
<form href="#"  class="tabs-light" >
 <div class="bg-jumbotron" >
    <div class="jumbotron "  ></div>
</div>
<div class="row">
  <div class="col-md-8 offset-md-2 mb-3">
    <tabs style="margin-top:-4.5rem;">
        <tab id="blogelist" :title="'label.posts'|trans" open=true>
        <button @click.prevent="all">all</button>
        <div class="row">
            <blog-post-preview :post="post" v-for="post in list"></blog-post-preview>
        </div>
        </tab>
        <tab id="blogedit" :title="'label.edit'|trans" >
          <div class="btn-group mb-1">
            <a href="#" class="btn btn-link" @click.prevent="saveForm"> <i class="fa fa-floppy-o"></i></a>
          <div class="btn">
            {{edit.lang}}
          </div>
          </div>
          <div class="form-group">
            <input :id="id+'-title'"  type="text" v-model="edit.title" class="form-control">
          </div>
          <div class="form-group">
          <b-tag v-model="edit.meta.tags" :value="edit.meta.tags"></b-tag>
          </div>
          <div class="form-group">
            <textarea v-model="edit.content" name="" class="form-control" :id="id+'-content'" cols="30" rows="30"></textarea>
          </div>
        </tab>
        <tab id="blogpreview" :title="'label.preview'|trans">
         <blog-post :post="edit"></blog-post>
        </tab>
        <tab id="blogdesetting" :title="'label.setting'|trans">
         <blog-post-setting :post="edit"></blog-post-setting>
        </tab>
    </tabs>
  </div>
</div>

</form>
</template>
<script>
  // const compiler = require('vue-template-compiler')
  import $ from 'jquery'
  require('summernote/dist/summernote.js')
  require('speakingurl/lib/speakingurl.js')
  require('summernote/dist/summernote.css')
  import blogPost from './BlogPost.vue'
  import blogPostPreview from './BlogPostPreview.vue'
  import blogPostSetting from './BlogPostSetting.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BlogAdmin',
    props: {
      id: {type: String, default: 'blog'},
      service: {type: String, default: 'blog'},
      type: {type: Boolean, default: true}
    },
    components: { blogPost, blogPostPreview, blogPostSetting },
    data () {
      return {
        summernote: {},
        edit: {
          id: 0,
          title: 'Lorem ipsum',
          content: '<h1>Lorem</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro quae dignissimos laborum placeat dolores hic sint, non rem reprehenderit odit harum aliquid iste velit vero quis fuga, dicta, accusamus temporibus!</p>',
          author: this.user,
          date: {
            create: '',
            update: ''
          },
          meta: {
            lang: this.locale,
            slug: '',
            tags: [],
            bgcolor: '#2C3448',
            bgalpha: '.3',
            color: '#fff'
          },
          version: 0
        },
        ranges: []
      }
    },
    computed: {
      ...mapGetters('blogModule', ['currency', 'postService', 'list']),
      ...mapGetters('userModule', ['user']),
      ...mapGetters('localeModule', ['locale']),
      ...mapGetters(['currency'])
    },
    methods: {
      ...mapActions('blogModule', ['blogService', 'savePost', 'all']),
      saveForm () {
        /* eslint-disable  */
        let message = prompt('Commentaire de modification')
        this.edit.commentaire = message
        this.edit.version++
        this.savePost({
          service: this.service,
          type: this.type,
          edit: this.edit,
          lang: this.lang
        })
      },
      update (index, value) {
        this.edit[index] = value
      },
      setRange () {
        let range = this.sn.summernote('createRange')
        this.sn.summernote('saveRange')
        this.ranges.push(range)
      },
      restoreRange (range) {
        this.sn.summernote('restoreRange', range)
      },
      addLink () {
        this.sn.summernote('createLink', {
          text: 'This is the Summernotes Official Site',
          url: 'http://summernote.org',
          newWindow: true
        })
      }
    },
    mounted () {
      this.all()

      this.edit.lang = this.locale
      this.edit.author = this.user
      let t = this
      let H1Button = (context) => {
        return $.summernote.ui.button({
          contents: '<strong>H1</strong>',
          tooltip: 'H1',
          click () { context.invoke('editor.formatH1') }
        }).render()
      }

      let H2Button = (context) => {
        return $.summernote.ui.button({
          contents: '<strong>H2</strong>',
          tooltip: 'H2',
          click () { context.invoke('editor.formatH2') }
        }).render()
      }

      let H3Button = (context) => {
        return $.summernote.ui.button({
          contents: '<strong>H3</strong>',
          tooltip: 'H3',
          click () { context.invoke('editor.formatH3') }
        }).render()
      }

      this.sn = $('#' + this.id + '-content')
      this.sn.summernote({
        lang: this.locale,
        height: 300,
        prettifyHtml: true,
        dialogsInBody: true,
        minHeight: 300,
        maxHeight: null,
        focus: true,
        toolbar: [
          ['style2', ['style']],
          ['misc', ['undo', 'redo']],
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['para', ['ul', 'ol']],
          ['para2', ['link', 'picture']],
          ['para3', ['codeview']],
          ['table', ['table']],
          ['mybutton', ['h1', 'h2', 'h3']]
        ],
        styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        callbacks: {
          onChange (contents, $editable) {
            t.update('content', contents)
          }
        },
        buttons: {
          h1: H1Button,
          h2: H2Button,
          h3: H3Button
        }
      })
    }
  }
</script>
<style lang="less">
.tabs-light{
  .nav-tabs{
    &,
    .nav-link{
      &,
      &.active{
        border-width: 0 !important;
        border-color: transparent !important;
      }
    }
    .nav-link{
      padding: .5rem;
      &.active{
        background-color: #F7F9FA;
      }
    }
  }
}
.note-editor,
.post{
  blockquote{
    font-weight: 800;
    font-size: 1.2rem;
    padding:  1rem 2rem;
    font-family: Georgia, serif;
    background-color: fade(#323232, 5%);
    p{
      margin: 0;
    }

  }
  h1{ font-size: 2.5rem; font-weight: 700; }
  h2{ font-size: 1.5rem; }
  pre{
    padding: .5rem;
    background-color: #323232;
    color: #ccc;
  }
}
.note-popover .popover-content>.btn-group,
.panel-heading.note-toolbar>.btn-group{
    margin-right: 1rem;
}
.dropdown-toggle{
  .note-icon-caret{
    display: none;
  }
}
.dropdown-menu.dropdown-style{
  padding: .3rem;
  &,
  *{
    color: #323232;
  }
}
</style>