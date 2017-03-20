<template>
<textarea :id="id" class="codemirror" v-model="content"></textarea>
</template>
<script>
  /* https://www.npmjs.com/package/blueimp-file-upload-npm */
  require('codemirror/lib/codemirror.js')
  require('codemirror/lib/codemirror.css')
  require('codemirror/theme/seti.css')

  require('codemirror/addon/hint/show-hint.js')
  require('codemirror/addon/search/jump-to-line.js')
  require('codemirror/addon/search/searchcursor.js')
  require('codemirror/addon/search/search.js')
  require('codemirror/addon/dialog/dialog.js')
  require('codemirror/addon/edit/matchbrackets.js')
  require('codemirror/addon/edit/closebrackets.js')
  require('codemirror/addon/comment/comment.js')
  require('codemirror/addon/wrap/hardwrap.js')
  require('codemirror/addon/fold/foldcode.js')
  require('codemirror/addon/fold/brace-fold.js')
  require('codemirror/addon/selection/active-line.js')
  require('codemirror/mode/htmlmixed/htmlmixed.js')
  require('codemirror/mode/css/css.js')
  require('codemirror/mode/markdown/markdown.js')
  require('codemirror/mode/javascript/javascript.js')
  require('codemirror/addon/lint/lint.js')
  require('codemirror/addon/hint/anyword-hint.js')
  require('codemirror/addon/hint/javascript-hint.js')
  require('codemirror/addon/hint/xml-hint.js')
  require('codemirror/keymap/sublime.js')

  export default {
    name: 'vcodemirror',
    props: {
      id: {type: String, default: 'codemirror'},
      content: {type: String, default: ''},
      mode: {type: String, default: 'javascript'}
    },
    data () {
      return {}
    },
    template: `
      <textarea class="CodeMirror" :id="id" v-model="content"></textarea>
    `,
    methods: {
      init () {
        /* eslint-disable  */
        let cm = CodeMirror.fromTextArea(document.getElementById(this.id), {
          theme: 'seti',
          lineNumbers: true,
          styleActiveLine: true,
          tabSize: 8,
          lineWrapping: true,
          mode: this.mode,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          keyMap: 'sublime',
          autoCloseBrackets: true,
          matchBrackets: true
        })
        cm.on('keypress', (cm, e) => {
          console.log(e)
        })
      },
      setMode () {}
    },
    mounted () {
      this.setMode(this.mode)
      this.init()
    }
  }
</script>
<style lang="less">
textarea.CodeMirror{
  padding: .3rem;
  background-color: #000;
  color: #fff;
  font-size: .8rem;
}
</style>

