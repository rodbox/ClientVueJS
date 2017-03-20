<template>
<div class="container-fluid paper-app" style="margin-top:3rem; padding:0px; overflow: hidden; width:100vw;">
  <div class="row bg-faded">
    <div class="col-md-12 text-center menu-side no-border">
      <div class="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group-sm"> 
            <button @click.prevent="paperNew" class="btn btn-default"><i class="fa fa-file-o"></i></button>
            <button @click.prevent="paperSave" class="btn btn-default"><i class="fa fa-floppy-o"></i></button>
            <button @click.prevent="paperLoad" class="btn btn-default"><i class="fa fa-folder-o"></i></button>
            <button @click.prevent="paperExport" class="btn btn-default"><i class="fa fa-download"></i></button>
          </div>
        <div class="btn-group-sm"> 
          <button @click.prevent="removeSelected" class="btn btn-default"><i class="fa fa-remove"></i></button>
          <a href="#" @click.prevent="setAction({'action': action.name})" v-for="(action, kaction) in menu.actions" class="btn btn-default" v-html="action.icon"><i class="fa fa-remove"></i></a>
        </div>
      </div>
    </div>
    <div class="col-tools no-border">
        <div class="btn-group-vertical btn-group-sm">
          <a href="#" v-for="tool in tools" class="btn btn-secondary" @click.prevent="setTool(tool.name)" :class="cssActive(tool.name)" v-html="tool.icon" :title="'label.tool.' + tool.name | trans"></a>
        </div>
        <div class="clearfix"></div>
        <v-paper-colors-active class="mt-2"></v-paper-colors-active>
    </div>
    <div class="col-md-8 col-side darken text-center scrollable no-border">
      <canvas :id="id" :width="width" :height="height" class="m-2" style="margin-left: 10rem !important;">
      </canvas>
    </div>
    <div class="col-md-2 col-side paper-sidebar">
        <v-paper-props></v-paper-props>
        <v-paper-layers class=""></v-paper-layers>
    </div>
    <div class="col-md-2 col-side no-border">
      <div id="paper-sidebar" class="paper-sidebar">
        <v-paper-colors></v-paper-colors>
        <v-paper-data class=""></v-paper-data>
        <v-paper-tags class=""></v-paper-tags>
        <v-paper-items class=""></v-paper-items>
      </div>
    </div>
    <div id="paper-footer"class=" darken open">
      <a href="#" @click.prevent="uiToggle({index: 'footer', values: ['close', 'open']})" class="btn btn-toggle"><i class="fa fa-remove"></i></a>
      <tabs>
        <tab id="tabpaperconsole" :title="'label.console' | trans" open="true">
          <div class="row">
            <div class="col-3">
              <p>paper</p>
            <pre>{{paper}}</pre></div>
            <div class="col-3"></div>
          </div>
        </tab>
        <tab id="tabpapercode" :title="'label.code' | trans">
          <v-paper-code class=""></v-paper-code>
        </tab>
        <tab id="tabpapersetting" :title="'label.setting' | trans">
          <v-paper-setting class=""></v-paper-setting>
        </tab>
      </tabs>
    </div>
  </div>
</div>
</template>
<script>
  import vPaperLayers from './vPaperLayers.vue'
  import vPaperColors from './vPaperColors.vue'
  import vPaperColorsActive from './vPaperColorsActive.vue'
  import vPaperData from './vPaperData.vue'
  import vPaperItems from './vPaperItems.vue'
  import vPaperSetting from './vPaperSetting.vue'
  import vPaperTags from './vPaperTags.vue'
  import vPaperProps from './vPaperProps.vue'
  import vPaperCode from './vPaperCode.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'vPaper',
    components: { vPaperLayers, vPaperData, vPaperTags, vPaperColors, vPaperColorsActive, vPaperProps, vPaperCode, vPaperSetting, vPaperItems },
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'project', 'list', 'paper', 'menu'])
    },
    props: {
      id: {type: String, default: 'myCanvas'},
      width: {type: Number, default: 400},
      height: {type: Number, default: 500}
    },
    methods: {
      ...mapActions(['addUi', 'removeUi', 'uiToggle']),
      ...mapActions('vpaperModule', ['setTool', 'paperNew', 'paperSave', 'paperLoad', 'paperExport', 'init', 'removeSelected']),
      cssActive (index) {
        return (this.tool === index) ? 'active' : ''
      }
    },
    mounted () {
      this.addUi({index: 'body', value: 'body-fix'})
      this.init(this.id)
    },
    destroyed () {
      this.removeUi({index: 'body', value: 'body-fix'})
    }
  }
</script>
<style lang="less">
.paper-app{
  &,
  *,
  a,
  p,
  label,
  .form-control,
  .btn{
    font-size: .5rem !important;
  }
}
.col-tools{
  position: absolute;
  left: .5rem;

  z-index: 4000;
}

#paper-footer{
  .btn-toggle{
    position: absolute;
    margin-top: -2rem;
    right: 1rem;
  }
  &.open {
    .btn-toggle{
      margin-top: 0rem !important;
    }
  }
  
  position: fixed;
  width: 100%;
  bottom: 0px;
  left: 0px;
  height: 25vh;
  border-top: 1px solid;
  p{
    color: #fff;
    margin-bottom: 0px;
  }
  .nav-link{
    &.first-child{
      margin-left: 1rem;
    }
  }
  .tab-pane{
    height: 20vh;
    overflow: auto;
  }
  
}
a[data-toggle="collapse"]{
  text-decoration: none !important;
  &[aria-expanded="true"]{
    &:before {
      opacity: 1;
    }
  }

  &:before {
    content:"::";
    opacity: .2;
    margin-right: .3rem;
  }
}
.col-side{
  height: 89vh;
  padding: 0 .3rem !important;
  overflow: hidden;
  overflow-y: auto;
  overflow-x: auto;
}
.scrollable{
  overflow: hidden;
  overflow-y: auto;
  overflow-x: auto;
}
  #paper-footer,
  .paper-sidebar{
    &,
    * {
      font-size: .8rem;
    }
    [data-toggle="collapse"]{
      font-weight: 700;
      color: #323232;
      
      &:hover{
        text-decoration: none;
      }
    }
    .list-group{
      list-group{
        display: block;
      }
    }
    ul.list{
  &,
  ul{
    list-style: none;
    padding-left: 0;
  }
  .form-group-sm {
    margin-bottom: .3rem;
    &:last-child {
      margin-bottom: 0rem;
    }
  }
}
  label{
    input[type="checkbox"]{
      display: inline;
      width: 16px;
    }
    font-size: .8rem;
  }
  .list-group{
    .list-group-item{
      padding: .3rem .5rem;
    }
  }


  }
  canvas {
    border: 1px solid #ccc;
    background-color: #fff;
  }
</style>
