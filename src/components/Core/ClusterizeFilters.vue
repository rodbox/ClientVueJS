<template>
 <div class="row pb-2">
    <div class="col-md-5">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-search"></i></div>
        <input type="text" class="form-control cluster-finder" style="width:70px;" v-model="finder.value" @input="setSearch(finder.value)" @keydown.left="navCur(-1)" @keydown.right="navCur(+1)" @keydown.down="navFocus(+1)"  @keydown.up="navFocus(-1)" @focus="setFocus(0)" @blur="setFocus(-1)" @keydown.space.prevent="toggleCheckFocus" @keydown.enter.prevent="editFocus">
        <div class="input-group-addon">
          <span class="text-muted"><strong>{{counterFinded}}</strong> <span class="text-sm">{{'label.result'|trans(counterFinded)}}</span></span>
        </div>   
        <div class="input-group-addon">
        <div class="btn-group">
            <button data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="dropdown-toggle">
              <span class="text-sm">{{'label.by'|trans}}</span> <strong>{{per}}</strong>
            </button>
            <div class="dropdown-menu w-fix">
              <a href="#" class="dropdown-item" @click.prevent="setPer(per)" v-for="per in pers">{{per}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2 text-center">
      <clusterize-pagination  :showpers=true></clusterize-pagination>
    </div>
    <div class="col-md-5 text-right">
        <div class="btn-group pull-right b-border">
          <clusterize-filter :filter="filter.id"  v-if="filter.filter" v-for="filter in filters" ></clusterize-filter>
          <div class="btn-group">
            <a href="#" @click.prevent="setClearFilter" class="btn btn-outline-default"><i class="fa fa-asterisk" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import clusterizePagination from './ClusterizePagination'
  import clusterizeFilters from './ClusterizeFilters'
  import clusterizeActions from './ClusterizeActions'
  import clusterizeFilter from './ClusterizeFilter'
  import clusterizeOrder from './ClusterizeOrder'
  import clusterizeForm from './ClusterizeForm'
  export default {
    name: 'ClusterizeFilters',
    components: {
      clusterizePagination,
      clusterizeFilters,
      clusterizeFilter,
      clusterizeActions,
      clusterizeOrder,
      clusterizeForm
    },
    props: {
      filter: {type: String, default: 'type'}
    },
    computed: {
      ...mapGetters('clusterizeModule', ['type', 'meta', 'filters', 'items', 'itemsPaginate', 'cur', 'per', 'pers', 'counter', 'order', 'pages', 'counterFinded', 'loaded', 'itemsFinded', 'finder', 'itemsFilters'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setPlaceholder', 'setFilter', 'setClearFilter', 'setPer', 'setCur', 'setEdit', 'navCur', 'setSearch', 'setFocus', 'navFocus', 'toggleCheckFocus', 'editFocus'])
    }
  }
</script>
<style lang="less">
.form-control.cluster-finder{
  border-right: 0px;
  border-left: 0px;
}
.btn-group.b-border{
  border-radius: .225rem;
  border: 1px solid fade(#000, 10%);
}
</style>