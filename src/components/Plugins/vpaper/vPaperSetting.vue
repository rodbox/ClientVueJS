<template>
<div class="row">
  <div v-for="(set, kset, nset) in setting" class="col-2">
    <b-input  :item="{id:kset, label: kset}" :value="set" label="kset" ></b-input>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'vPaperCode',
    computed: {
      ...mapGetters('vpaperModule', ['setting'])
    },
    methods: {
      ...mapActions('vpaperModule', ['playCode'])
    },
    mounted () {}
  }
</script>
<style lang="less">
.btn-setcolor{
  width: 24px;
  height: 24px;
  display: inline-block;
}
</style>
