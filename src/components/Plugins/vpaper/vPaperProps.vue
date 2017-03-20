<template>
<div class="sidebar-item">
 <a data-toggle="collapse" @click="setUi" data-parent="#paper-sidebar" href="#paper-props" aria-expanded="true" aria-controls="paper-data">{{'label.props'|trans}}</a>
  <div id="paper-props" class="collapse show" aria-expanded="true">
 <div class="btn-group-sm">
 <button @click="playProps" class="btn btn-default"><i class="fa fa-play"></i></button>
 </div>
      <ul class="list-group">
        <li v-for="(prop, kprop, nprop) in props" class="list-group-item">
            <span class="title">{{kprop}}</span>
            <ul class="list">
              <li v-for="(pro, kpro, npro) in prop">
                <v-paper-props-value :index="kprop + '_' + kpro" :title="kpro" :value="pro" :data="pro"></v-paper-props-value>
            </li>
            </ul>
          </span>
        </li>
      </ul>
  </div>
</div>
</template>
<script>
  import vPaperPropsValue from './vPaperPropsValue.vue'
  import vPaperPropsValueSuggest from './vPaperPropsValueSuggest.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'props',
    components: { vPaperPropsValue, vPaperPropsValueSuggest },
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'props', 'ui'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setLayer', 'setUi', 'playProps']),
      isObject (prop) {
        return typeof prop === 'object'
      }
    },
    mounted () {}
  }
</script>
<style lang="less">
.dropzone{
  background-color: fade(#fff, 20%);
  padding: .5rem;
  margin: .5rem;
}
label.col-4{
  padding-left: 0px;
  margin-right: -.5rem;
  margin-left: .5rem;
}
.form-group-sm{
  margin-bottom: .3rem;
}
</style>
