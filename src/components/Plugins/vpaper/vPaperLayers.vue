<template>
<div class="sidebar-item">
 <a data-toggle="collapse" data-parent="#paper-sidebar" href="#paper-layers" aria-expanded="false" aria-controls="paper-layers">{{'label.layers'|trans}}</a>
  <div id="paper-layers" class="collapse">
    <button @click="createLayer"><i class="fa fa-plus"></i></button>
    <button @click="createGroup"><i class="fa fa-folder"></i></button>

     <div class="list-group "  >
      <div class="list-group-item" v-for="(layer, klayer, nlayer) in paper">{{layer}}</div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'layers',
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'layers', 'paper'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setLayer', 'createLayer', 'activeLayer', 'createGroup'])
    },
    mounted () {}
  }
</script>
<style lang="less">
</style>
