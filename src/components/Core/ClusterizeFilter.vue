<template>
  <div class="btn-group" :data-label="'label.'+filter|trans">
    <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn btn-outline-default dropdown-toggle btn-w">
      <span class="text-sm">{{"label."+filter|trans}}</span> : <strong>{{itemsFilters[filter]}}</strong>
    </a>
    <div class="dropdown-menu dropdown-menu-right ">
      <a href="#" @click.prevent="setFilter({type: filter, value: '*'})" class="dropdown-item">{{'label.all'|trans}}</a>
      <div class="dropdown-divider"></div>
      <a href="#" @click.prevent="setFilter({type: filter, value: filterData})" class="dropdown-item" v-for="filterData in filters[filter]['data']">{{filterData}}</a>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ClusterizeFilter',
    props: {
      filter: {type: String, default: 'type'}
    },
    computed: {
      ...mapGetters('clusterizeModule', ['order', 'filters', 'itemsFilters'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setFilter', 'bgOrder'])
    }
  }
</script>
<style lang="less">
.dropdown-menu {
  margin-top: -.3rem;
  .dropdown-divider {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    background-color: fade(#000, 10%);
  }
  .dropdown-item {
    padding: .3rem 1rem;
  }
}
.btn-w{
  min-width: 50px;
}
[data-label]{
  &.label-show {
    &::before{
      content: attr(data-label);
      position: absolute;
      margin-top: -1rem;
      margin-left: .1rem;
      font-size: .7rem;
    }
  }
}
.clusterize-order{
  &:active,
  &:focus,
  &:hover
  {
    text-decoration: none;
  }
  font-weight: 700;
  display: block;
  text-align: center;
  color: #323232 !important;
  .text-muted{
    opacity: 0.2
  }
}
</style>