<template>
  <div>
    <v-slug :slug="$route.params.slug"></v-slug>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import vSlug from '../components/Slug/vSlug.vue'
  export default {
    name: 'slug',
    components: ({ vSlug }),
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['urls']),
      ...mapGetters('userModule', ['user']),
      ...mapGetters('clusterizeModule', ['edit', 'formadd'])
    },
    methods: {
      ...mapActions(['loadToggle', 'addUi']),
      ...mapActions('clusterizeModule', ['addIndexEdit', 'delIndexEdit', 'updForm'])
    },
    mounted () {
      this.addUi({index: 'body', value: 'body-fix'})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
