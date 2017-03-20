<template>
  <div :id="id" class="tab-pane" :class="openClass()">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'tab',
  props: {
    id: {type: String, default: ''},
    title: {type: String, default: ''},
    open: {type: Boolean, default: false}
  },
  methods: {
    openClass (item) {
      return this.open ? 'active' : ''
    }
  },
  created () {
    this.$parent.items.push({
      id: this.id,
      title: this.title,
      open: this.open
    })
  }
}
</script>
<style lang="less">
</style>