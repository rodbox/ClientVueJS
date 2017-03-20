<template>
<select class="form-control custom-select">
  <option :value="suggest" v-for="suggest in suggest">{{suggest}}</option>
</select>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'propsValueSuggest',
    props: {
      index: {type: String, default: ''},
      title: {type: String, default: ''},
      value: {type: Object, default: {}},
      suggests: {type: Object, default: {}}
    },
    computed: {
      ...mapGetters('vpaperModule', [''])
    },
    methods: {
      ...mapActions([''])
    },
    mounted () {}
  }
</script>
<style lang="less">
.mini-switch{
  width: 1px;
  height: 1px;
  opacity: 0;
  position: absolute;
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
