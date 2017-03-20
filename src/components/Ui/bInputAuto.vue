<template>
  <div class="form-group">
    <label :for="prefix+item.id" v-if="item.label!=''">{{'label.'+item.label|trans}} <span v-if="item.required">*</span></label>
    <b-input v-if="item.form == 'text'" v-model="value" :item=item :prefix=prefix :value=value></b-input>
    <b-select v-else-if="item.form == 'select'" v-model="value" :item=item :prefix=prefix :value=value></b-select>
    <b-check v-else-if="item.form == 'checkbox'" v-model="value" :item=item :prefix=prefix :value=value></b-check>
    <b-input v-else :item=item :prefix=prefix v-model="value" :value=value></b-input>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'bInputAuto',
    computed: {
      ...mapGetters('clusterizeModule', ['edit'])
    },
    props: {
      prefix: {type: String, default: 'clust'},
      item: {type: Object, default: {}},
      value: {type: [String, Object, Boolean], default: false}
    }
  }
</script>
<style lang="less">
</style>