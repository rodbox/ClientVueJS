<template>
<th :class="bgOrder(index)" class="text-center" :style="'width:'+size+'px !important;'">
   <div>
     <slot></slot>
   </div>
<a href="#"  class="clusterize-order btn btn-link" @click.prevent="setOrder(index)">
  {{'label.'+index|trans}}
  <span class="" v-if="order[0] === index">
    <i class="fa fa-caret-down" v-if="order[1]" aria-hidden="true"></i>
    <i class="fa fa-caret-up" v-else aria-hidden="true"></i>
   </span>
   <span class="" v-else>
    <i class="fa fa-caret-down text-muted" aria-hidden="true"></i>
   </span>
</a>
</th>
</template>
<script>
  import clusterizeFilters from './ClusterizeFilters'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ClusterizeOrder',
    components: {
      clusterizeFilters
    },
    props: {
      index: {type: String, default: ''},
      size: {type: Number, default: 50}
    },
    computed: {
      ...mapGetters('clusterizeModule', ['type', 'meta', 'filters', 'items', 'itemsPaginate', 'cur', 'per', 'pers', 'counter', 'edit', 'order', 'pages', 'counterFilter'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setPlaceholder', 'setFilter', 'setClearFilter', 'setPer', 'setCur', 'setEdit', 'setOrder']),
      bgOrder (index) {
        return (index === this.order[0]) ? 'index-order' : ''
      }
    }
  }
</script>
<style lang="less">
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
    opacity: 0;
  }
}
</style>