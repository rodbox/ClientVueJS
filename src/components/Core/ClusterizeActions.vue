<template>
 <div class="btn-group">
  <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn btn-link dropdown-toggle">
    <i class="fa fa-cog"></i>
  </a>
  <div class="dropdown-menu">
    <modal-button id="create" @click="setEdit({})" class="dropdown-item"><i class="fa fa-plus fa-fw"></i> {{'action.create'|trans}}</modal-button>
    <a href="#" @click.prevent="setDataService({service})" class="dropdown-item"><i class="fa fa-refresh fa-fw"></i> {{'action.refresh'|trans}}</a>
    <a href="#" @click.prevent="toggleCheckAll" class="dropdown-item"><i class="fa fa-square fa-fw"></i> {{'action.check_all'|trans}}</a>
    <a href="#" @click.prevent="exportSelect(service)" class="dropdown-item"><i class="fa fa-download fa-fw" aria-hidden="true"></i>
</i> {{'action.export_select'|trans}}</a>
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ClusterizeAction',
    components: {
    },
    props: {
      id: {type: String, default: 'clust'},
      service: {type: String, default: 'placeholder'}
    },
    computed: {
      ...mapGetters('clusterizeModule', ['type', 'meta', 'filters', 'items', 'itemsPaginate', 'cur', 'per', 'pers', 'counter', 'edit', 'order', 'pages', 'counterFilter'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setDataService', 'setFilter', 'setClearFilter', 'setPer', 'setCur', 'setEdit', 'setOrder', 'toggleCheckAll', 'exportSelect'])
    }
  }
</script>
<style lang="less">
</style>