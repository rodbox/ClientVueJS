<template>
<div class="row">
<div class="col-1">
  
    <div class="btn-group-sm">
      <button @click.prevent="playCode" class="btn btn-default"><i class="fa fa-play"></i></button>
    </div>
</div>
<div class="col-11">
    <brace
      :fontsize="'22px'"
      :theme="'monokai'"
      :mode="'javascript'"
      :codefolding="'markbegin'"
      :softwrap="'free'"
      :selectionstyle="'text'"
      :highlightline="true"
      v-html="code">
    </brace>
</div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'vPaperCode',
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'code', 'paletteActive'])
    },
    methods: {
      ...mapActions('vpaperModule', ['playCode'])
    },
    mounted () {}
  }
</script>
<style lang="less">
.ace_editor{
  min-height: 15vh;
  font-size: .7rem;
  &.ace-monokai{
    background-color: darken(#222A3F, 5%);
    .ace_gutter-cell,
    .ace_gutter{
      background-color: darken(#222A3F, 8%);
    }
  }
}
.btn-setcolor{
  width: 24px;
  height: 24px;
  display: inline-block;
}
</style>
