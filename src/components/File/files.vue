<template>
  <div>
    <h1>{{'label.fils'|trans}}</h1>
    <div v-for="file in files">
      {{file}}
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'files',
    components: {
      icon: require('./icon')
    },
    computed: {
      ...mapGetters('fileModule', ['files'])
    },
    methods: {
      ...mapActions('fileModule', [''])
    }
  }
</script>
<style lang="less">
</style>