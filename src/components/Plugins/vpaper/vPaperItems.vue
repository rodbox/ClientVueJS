<template>
<div class="sidebar-item">
 <a data-toggle="collapse" data-parent="#paper-sidebar" href="#paper-item" aria-expanded="false" aria-controls="paper-item">{{'label.item'|trans}}</a>
  <div id="paper-item" class="collapse">
    <div class="list-group "  >
      <div class="list-group-item" v-for="(item, kitem, nitem) in items">{{kitem}} : {{item}}</div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'data',
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'data', 'items'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setLayer'])
    },
    mounted () {}
  }
</script>
<style lang="less">
</style>
