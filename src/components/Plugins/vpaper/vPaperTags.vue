<template>
<div class="sidebar-item">
<div class="dropzone" @drop="dragu"> dropzone</div>
 <a data-toggle="collapse" data-parent="#paper-sidebar" href="#paper-tags" aria-expanded="false" aria-controls="paper-tags">{{'label.tags'|trans}}</a>
  <div id="paper-tags" class="collapse">
    <div class="list-group "  >
      <div class="list-group-item" v-for="(tag, ktag, ntag) in tags">
         <span class="badge badge-primary" ><i class="fa fa-tag"></i> {{ktag}}</span> : 
        <span class="badge-sm badge badge-primary " draggable="true"  v-for="ta in tag"> <input type="checkbox"> {{ktag}} {{ta}} <i class="fa fa-caret-right"></i></span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'tags',
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'tags'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setLayer']),
      dragu () {
        /* eslint-disable  */ 
        alert('lmkm')
      }
    },
    mounted () {}
  }
</script>
<style lang="less">
.badge-primary.draggable{
  font-size: .7rem;
  font-weight: 400;
}

</style>
