<template>
<div class="sidebar-item">
 <a data-toggle="collapse" data-parent="#paper-sidebar" href="#paper-data" aria-expanded="false" aria-controls="paper-data">{{'label.data'|trans}}</a>
  <div id="paper-data" class="collapse">
    <div class="list-group "  >
      <div class="list-group-item" v-for="(dat, kdat, ndat) in data">{{kdat}} : {{dat}}</div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'data',
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'data'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setLayer'])
    },
    mounted () {}
  }
</script>
<style lang="less">
</style>
