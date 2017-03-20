<template>
  <div class="form-group row">
    <label :for="id" class="col-3 col-form-label">{{"label."+label|trans}}</label>
    <div class="col-9"><slot><input type="text" :id="id" ></slot></div>
  </div>
</template>
<script>
  export default {
    name: 'bLabel',
    props: {
      id: {type: String, default: 'input-text'},
      label: {type: String, default: ''}
    },
    methods: {
    }
  }
</script>
<style lang="less">
.nav-link{
  font-weight: 600;
}
</style>