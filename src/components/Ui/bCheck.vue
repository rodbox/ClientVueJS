<template>
  <input type="checkbox" :id="prefix+item.id" :name="item.name" :value="value" @change="updateValue"/>
</template>
<script>
  export default {
    name: 'bCheck',
    props: {
      prefix: {type: String, default: 'clust'},
      item: {type: Object, default: {}},
      value: {type: Object, default: {}}
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