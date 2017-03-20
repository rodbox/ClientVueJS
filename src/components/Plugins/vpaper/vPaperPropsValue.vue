<template>
<div class="row">
  <label  :for="'vpaperprops-' + index + '-tag'" class="col-4" >{{title}} <i class="fa fa-tag text-success text-sm tag-value" v-if="value.tag"></i></label>
  <div class="col-8">
    <input :id="'vpaperprops-' + index + '-tag'" type="checkbox" v-model="value.tag" class="mini-switch" />
    <div class="form-control form-control-sm  droptag  " bag="tag" v-if="value.tag" >
      drop
    </div>
    <span v-else>
      <b-select v-if="isSuggest(data.suggest)" :value="value" :item="{id: 'vpaperprops-' + index, data: data.suggest.values}" class="form-sm"></b-select>
      <input v-else :id="'vpaperprops-' + index"  type="text" class="form-control form-control-sm " :value="value.value"/>
    </span>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'propsValue',
    props: {
      index: {type: String, default: ''},
      title: {type: String, default: ''},
      data: {type: Object, default: {}},
      value: {type: Object, default: {}}
    },
    computed: {
      ...mapGetters(['isObject']),
      ...mapGetters('vpaperModule', ['tool', 'tools', 'props'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setLayer', 'drop']),
      isSuggest (dataValue) {
        return dataValue !== undefined
      }
    },
    mounted () {}
  }
</script>
<style lang="less">
.tag-value{
  margin-top: .5rem;
}
.mini-switch{
  width: 1px;
  height: 1px;
  opacity: 0;
  position: absolute;
}
.form-sm > .form-control.custom-select{
    padding: .25rem .5rem !important;
    font-size: .7rem !important;
    border-radius: .2rem !important;
    height: 24px !important;
    margin-bottom: .1rem;
    option{
      color: #323232 !important;
    }
  }
.tag-value{
  position: absolute;
  right: 0;
}
label.col-4{
  padding-left: 0px;
  padding-right: 0px;
}
.form-group-sm{
  margin-bottom: .3rem;
}
</style>
