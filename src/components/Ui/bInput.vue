<template>
    <div class="form-group">
    <label :for="prefix+item.id" v-if="label">{{'label.'+item.label|trans}} <span v-if="item.required">*</span></label>
    <input :type="item.type" :id="prefix+item.id" :name="item.name" class="form-control" :value="value" @input="updateValue"/>
    
  </div>
</template>
<script>
  export default {
    name: 'bInput',
    data () {
      return {
      }
    },
    props: {
      prefix: {type: String, default: 'clust'},
      item: {type: Object, default: {}},
      label: {type: Boolean, default: false},
      value: {type: String, default: ''}
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