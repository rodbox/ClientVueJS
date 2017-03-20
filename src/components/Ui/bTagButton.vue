<template>
  <span class="badge"><a href="#" v-if="deletable" class="btn-destroy" @click.prevent="delTag(service, tag, id)"><i class="fa fa-remove"></i></a> <a href="#" @click.prevent="setTagFilter(tag)">
    <span v-if="limit">{{tag |limit(limit)}}</span>
    <span v-else>{{tag}}</span>
  </a></span>
</template>
<script>
  export default {
    name: 'bTagButton',
    props: {
      tag: {type: String, default: 'clust'},
      limit: {type: [Boolean, Number], default: false},
      service: {type: String, default: 'clust'},
      id: {type: String, default: ''},
      deletable: {type: Boolean, default: false}
    },
    methods: {
      setTagFilter (tag) {
        /* eslint-disable  */
        alert('filter : ' + tag)
      },
      delTag () {
        /* eslint-disable  */
        if (confirm('del tag item')) {
          alert('tag supprimé')
        }
      }
    }
  }
</script>
<style lang="less">

</style>