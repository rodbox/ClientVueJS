<template>
<div>
  <select :type="item.type" :id="prefix+item.id" :name="item.name" class="form-control custom-select" v-model="value"  @change="updateValue">
    <option value="" v-if="!item.required">-</option>
    <option :value="val" v-for="val in item.data">{{val}}</option>
  </select>
</div>
</template>
<script>
  export default {
    name: 'bSelect',
    data () {
      return {
        value: 'warning'
      }
    },
    props: {
      prefix: {type: String, default: 'clust'},
      item: {type: Object, default: {}},
      value: {type: [String, Object, Boolean], default: ''}
    },
    methods: {
      updateValue (e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>
<style lang="less">
</style>