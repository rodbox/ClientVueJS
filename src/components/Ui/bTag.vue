<template>
<div>
  <select :type="item.type" :id="prefix+item.id" :name="item.name" class="form-control custom-select" v-model="value" multiple>
    <option value="" v-if="!item.required">-</option>
    <option :value="val" v-for="val in item.data">{{val}}</option>
  </select>
</div>
</template>
<script>
  require('select2')
  import $ from 'jquery'
  export default {
    name: 'bTag',
    props: {
      prefix: {type: String, default: 'clust'},
      item: {type: Object, default: {}},
      value: {type: [String, Object, Boolean], default: ''}
    },
    methods: {
      setValue (value) {
        this.value = value
      }
    },
    mounted () {
      let id = this.prefix + this.item.id
      $('#' + id).select2({
        tags: true,
        tokenSeparators: [',', ' '],
        createTag: function (params) {
          return {
            id: params.term,
            text: params.term
          }
        },
        templateResult (state) {
          return state.name
        }
      }).on('change', (valc) => {
        let val = $('#' + id).val()
        this.setValue(val)
        this.$emit('input', val)
      })
    }
  }
</script>
<style lang="less">
.select2 {
}

.select2-results,
.select2-search__field,
.select2-selection__choice{
  padding: .1rem .3rem  !important;
  border: 0 !important;
  font-size: .8rem !important;
}

.select2-selection__choice__remove {
  margin-right: .3rem !important;
}
</style>