<template>
  <span class="fa-stack" :style="getColor(ext)">
    <i class=" fa-stack-1x fa-2x " :class="getCss(ext)"></i>
    <i class="fa fa-file-o fa-stack-2x fa-2x"></i>
  </span>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'fileicon',
    props: {
      ext: { type: String, default: 'txt' }
    },
    computed: {
      ...mapGetters('fileModule', ['icons'])
    },
    methods: {
      ...mapActions('fileModule', ['getColor, getCss'])
    }
  }
</script>
<style lang="less">
</style>