<template>
<div class="sidebar-item">
 <a data-toggle="collapse" data-parent="#paper-sidebar" href="#paper-colors" aria-expanded="true" aria-controls="paper-colors">{{'label.colors'|trans}}</a>
  <div id="paper-colors" class="collapse show" aria-expanded="true" >
    <div class="list-group "  >
      <div class="list-group-item">
        <a href="#" @click.prevent="setColor(color)" v-for="color in paletteActive" :style="'background-color:'+color.hex" class="btn-setcolor"> </a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'colors',
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'colors', 'paletteActive'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setColor'])
    },
    mounted () {}
  }
</script>
<style lang="less">
.btn-setcolor{
  width: 24px;
  height: 24px;
  margin-left: .1rem;
  margin-bottom: .1rem;
  display: inline-block;
}
</style>
